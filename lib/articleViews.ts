import { Redis } from "@upstash/redis"
import { createHash, createHmac, timingSafeEqual } from "node:crypto"

const TOKEN_TTL_SECONDS = 60 * 60
const VISIT_TTL_SECONDS = 60 * 60 * 24
const RATE_BUCKET_SECONDS = 60
const RATE_BUCKET_TTL_SECONDS = RATE_BUCKET_SECONDS * 2
export const ARTICLE_VIEW_RATE_LIMIT_MAX = 30

const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|preview|facebookexternalhit|slackbot|discordbot|whatsapp|telegrambot|linkedinbot|embedly|quora link preview|google web preview|bingpreview/i

const PREFETCH_HEADER_VALUES = new Set(["prefetch", "preview", "prerender"])

export interface ArticleViewTokenPayload {
  articleId: string
  baseline: number
  exp: number
}

export interface CountArticleViewParams {
  articleId: string
  visitId: string
  ipHash: string
  baseline?: number
  isBot?: boolean
  now?: number
  redis?: RedisStore
}

export interface CountArticleViewResult {
  count: number
  counted: boolean
}

export interface BotSignalInput {
  userAgent?: string | null
  purpose?: string | null
  secPurpose?: string | null
  xMiddlewarePrefetch?: string | null
}

export interface RedisStore {
  get<TData>(key: string): Promise<TData | null>
  set<TData>(
    key: string,
    value: TData,
    opts?: {
      ex?: number
      nx?: true
    },
  ): Promise<"OK" | TData | null>
  incr(key: string): Promise<number>
  expire(key: string, seconds: number): Promise<number>
}

let redisClient: Redis | null | undefined

function getSigningSecret() {
  return process.env.ARTICLE_VIEW_SIGNING_SECRET || ""
}

function getRedisCredentials() {
  return {
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
  }
}

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url")
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8")
}

function signTokenValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url")
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

function normalizeCount(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.floor(value))
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10)
    if (Number.isFinite(parsed)) {
      return Math.max(0, parsed)
    }
  }

  return 0
}

function normalizeBaseline(baseline?: number) {
  if (typeof baseline !== "number" || !Number.isFinite(baseline)) {
    return 0
  }

  return Math.max(0, Math.floor(baseline))
}

function isValidVisitId(visitId: string) {
  return /^[A-Za-z0-9:_-]{8,200}$/.test(visitId)
}

async function seedCount(redis: RedisStore, articleId: string, baseline = 0) {
  const normalizedBaseline = normalizeBaseline(baseline)
  await redis.set(getArticleViewCountKey(articleId), normalizedBaseline, { nx: true })
}

async function readCount(redis: RedisStore, articleId: string, baseline = 0) {
  await seedCount(redis, articleId, baseline)
  const rawCount = await redis.get<number | string>(getArticleViewCountKey(articleId))
  return normalizeCount(rawCount)
}

export function isArticleViewsConfigured() {
  const { url, token } = getRedisCredentials()
  return Boolean(url && token && getSigningSecret())
}

export function getArticleViewsRedis() {
  const { url, token } = getRedisCredentials()

  if (!url || !token) {
    return null
  }

  if (!redisClient) {
    redisClient = new Redis({ url, token })
  }

  return redisClient
}

export function getArticleViewCountKey(articleId: string) {
  return `article:views:count:${articleId}`
}

export function getArticleViewVisitKey(visitId: string) {
  return `article:views:visit:${visitId}`
}

export function getArticleViewRateKey(articleId: string, ipHash: string, bucket: number) {
  return `article:views:rate:${articleId}:${ipHash}:${bucket}`
}

export async function getArticleViewCount(articleId: string) {
  const redis = getArticleViewsRedis()

  if (!redis) {
    return null
  }

  try {
    const rawCount = await redis.get<number | string>(getArticleViewCountKey(articleId))
    return rawCount === null ? null : normalizeCount(rawCount)
  } catch {
    return null
  }
}

export function createArticleViewToken(articleId: string, baseline = 0, now = Date.now()) {
  const secret = getSigningSecret()

  if (!secret) {
    return null
  }

  const payload: ArticleViewTokenPayload = {
    articleId,
    baseline: normalizeBaseline(baseline),
    exp: Math.floor(now / 1000) + TOKEN_TTL_SECONDS,
  }

  const encodedPayload = encodeBase64Url(JSON.stringify(payload))
  const signature = signTokenValue(encodedPayload, secret)
  return `${encodedPayload}.${signature}`
}

export function verifyArticleViewToken(token: string, articleId: string, now = Date.now()) {
  const secret = getSigningSecret()

  if (!secret) {
    return null
  }

  const [encodedPayload, signature] = token.split(".")

  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = signTokenValue(encodedPayload, secret)
  if (!safeCompare(signature, expectedSignature)) {
    return null
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as Partial<ArticleViewTokenPayload>
    const normalizedPayload: ArticleViewTokenPayload = {
      articleId: payload.articleId || "",
      baseline: normalizeBaseline(payload.baseline),
      exp: typeof payload.exp === "number" ? payload.exp : 0,
    }

    if (!normalizedPayload.articleId || normalizedPayload.articleId !== articleId) {
      return null
    }

    if (!Number.isFinite(normalizedPayload.exp) || normalizedPayload.exp < Math.floor(now / 1000)) {
      return null
    }

    return normalizedPayload
  } catch {
    return null
  }
}

export function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }

  return headers.get("x-real-ip") || "unknown"
}

export function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex").slice(0, 24)
}

export function isLikelyBot(input: BotSignalInput) {
  const userAgent = input.userAgent || ""
  if (!userAgent || BOT_USER_AGENT_PATTERN.test(userAgent)) {
    return true
  }

  if (input.xMiddlewarePrefetch === "1") {
    return true
  }

  const purpose = (input.purpose || input.secPurpose || "").toLowerCase()
  return PREFETCH_HEADER_VALUES.has(purpose)
}

export async function countArticleView({
  articleId,
  visitId,
  ipHash,
  baseline = 0,
  isBot = false,
  now = Date.now(),
  redis,
}: CountArticleViewParams): Promise<CountArticleViewResult> {
  const store = redis || getArticleViewsRedis()

  if (!store) {
    throw new Error("Article view counter is not configured.")
  }

  const currentCount = await readCount(store, articleId, baseline)

  if (!articleId || !isValidVisitId(visitId) || !ipHash || isBot) {
    return {
      count: currentCount,
      counted: false,
    }
  }

  const visitWrite = await store.set(getArticleViewVisitKey(visitId), "1", {
    nx: true,
    ex: VISIT_TTL_SECONDS,
  })

  if (visitWrite !== "OK") {
    return {
      count: currentCount,
      counted: false,
    }
  }

  const bucket = Math.floor(now / (RATE_BUCKET_SECONDS * 1000))
  const rateKey = getArticleViewRateKey(articleId, ipHash, bucket)
  const attempts = await store.incr(rateKey)
  if (attempts === 1) {
    await store.expire(rateKey, RATE_BUCKET_TTL_SECONDS)
  }

  if (attempts > ARTICLE_VIEW_RATE_LIMIT_MAX) {
    return {
      count: currentCount,
      counted: false,
    }
  }

  const nextCount = await store.incr(getArticleViewCountKey(articleId))
  return {
    count: nextCount,
    counted: true,
  }
}
