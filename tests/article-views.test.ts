import assert from "node:assert/strict"
import test from "node:test"

import {
  ARTICLE_VIEW_RATE_LIMIT_MAX,
  countArticleView,
  createArticleViewToken,
  getArticleViewCountKey,
  type RedisStore,
  verifyArticleViewToken,
} from "../lib/articleViews"

class MemoryRedis implements RedisStore {
  private readonly values = new Map<string, number | string>()

  async get<TData>(key: string) {
    return (this.values.get(key) as TData | undefined) ?? null
  }

  async set<TData>(
    key: string,
    value: TData,
    opts?: {
      ex?: number
      nx?: true
    },
  ) {
    if (opts?.nx && this.values.has(key)) {
      return null
    }

    this.values.set(key, value as number | string)
    return "OK" as const
  }

  async incr(key: string) {
    const nextValue = Number(this.values.get(key) ?? 0) + 1
    this.values.set(key, nextValue)
    return nextValue
  }

  async expire(key: string, seconds: number) {
    void key
    void seconds
    return 1
  }
}

test("creates and verifies signed article view tokens", () => {
  process.env.ARTICLE_VIEW_SIGNING_SECRET = "article-view-secret"

  const token = createArticleViewToken("article-123", 42, 1_700_000_000_000)
  assert.ok(token)

  const payload = verifyArticleViewToken(token!, "article-123", 1_700_000_100_000)
  assert.deepEqual(payload, {
    articleId: "article-123",
    baseline: 42,
    exp: 1_700_003_600,
  })
})

test("rejects tampered and expired view tokens", () => {
  process.env.ARTICLE_VIEW_SIGNING_SECRET = "article-view-secret"

  const token = createArticleViewToken("article-123", 10, 1_700_000_000_000)
  assert.ok(token)

  const tampered = `${token!.slice(0, -1)}x`
  assert.equal(verifyArticleViewToken(tampered, "article-123", 1_700_000_100_000), null)
  assert.equal(verifyArticleViewToken(token!, "article-123", 1_700_004_000_000), null)
  assert.equal(verifyArticleViewToken(token!, "another-article", 1_700_000_100_000), null)
})

test("counts the same visit only once", async () => {
  const redis = new MemoryRedis()

  const first = await countArticleView({
    redis,
    articleId: "article-1",
    visitId: "visit-001",
    ipHash: "ip-hash",
    baseline: 7,
    now: 1_700_000_000_000,
  })

  const second = await countArticleView({
    redis,
    articleId: "article-1",
    visitId: "visit-001",
    ipHash: "ip-hash",
    baseline: 7,
    now: 1_700_000_000_100,
  })

  assert.deepEqual(first, { count: 8, counted: true })
  assert.deepEqual(second, { count: 8, counted: false })
})

test("shares counters across alias routes for one article id and separates different article ids", async () => {
  const redis = new MemoryRedis()

  await countArticleView({
    redis,
    articleId: "article-shared",
    visitId: "blog-route-hit-001",
    ipHash: "ip-one",
    baseline: 5,
    now: 1_700_000_000_000,
  })

  const sharedResult = await countArticleView({
    redis,
    articleId: "article-shared",
    visitId: "guide-route-hit-001",
    ipHash: "ip-two",
    baseline: 5,
    now: 1_700_000_010_000,
  })

  const separateResult = await countArticleView({
    redis,
    articleId: "article-other-audience",
    visitId: "same-slug-other-audience-001",
    ipHash: "ip-two",
    baseline: 3,
    now: 1_700_000_010_000,
  })

  assert.deepEqual(sharedResult, { count: 7, counted: true })
  assert.deepEqual(separateResult, { count: 4, counted: true })
  assert.equal(await redis.get(getArticleViewCountKey("article-shared")), 7)
  assert.equal(await redis.get(getArticleViewCountKey("article-other-audience")), 4)
})

test("throttles repeated hits from one ip within the same rate bucket", async () => {
  const redis = new MemoryRedis()
  let lastResult = { count: 0, counted: false }

  for (let index = 0; index < ARTICLE_VIEW_RATE_LIMIT_MAX + 1; index += 1) {
    lastResult = await countArticleView({
      redis,
      articleId: "article-rate-limited",
      visitId: `visit-id-${index}`,
      ipHash: "same-ip",
      baseline: 0,
      now: 1_700_000_000_000,
    })
  }

  assert.deepEqual(lastResult, {
    count: ARTICLE_VIEW_RATE_LIMIT_MAX,
    counted: false,
  })
  assert.equal(await redis.get(getArticleViewCountKey("article-rate-limited")), ARTICLE_VIEW_RATE_LIMIT_MAX)
})
