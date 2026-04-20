import assert from "node:assert/strict"
import test from "node:test"

import { NextRequest } from "next/server"

type MiddlewareModule = {
  proxy?: (request: NextRequest) => Response
  default?: {
    proxy?: (request: NextRequest) => Response
  }
}

async function loadProxy() {
  const proxyModule = (await import("../proxy")) as MiddlewareModule
  const proxy = proxyModule.proxy ?? proxyModule.default?.proxy

  if (!proxy) {
    throw new Error("Unable to load proxy export")
  }

  return proxy
}

function createRequest(
  pathname: string,
  {
    acceptLanguage,
    cookie,
  }: {
    acceptLanguage?: string
    cookie?: string
  } = {},
) {
  const headers = new Headers()

  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage)
  }

  if (cookie) {
    headers.set("cookie", cookie)
  }

  return new NextRequest(`https://afftraff.io${pathname}`, { headers })
}

test("redirects root Russian browsers to the Russian affiliate home", async () => {
  const proxy = await loadProxy()

  const response = proxy(createRequest("/", { acceptLanguage: "ru-RU,ru;q=0.9,en;q=0.8" }))

  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), "https://afftraff.io/ru/affiliate")
})

test("redirects unlocalized Russian paths to the Russian affiliate path", async () => {
  const proxy = await loadProxy()

  const response = proxy(createRequest("/blog", { acceptLanguage: "ru" }))

  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), "https://afftraff.io/ru/affiliate/blog")
})

test("redirects English browsers to the English affiliate home", async () => {
  const proxy = await loadProxy()

  const response = proxy(createRequest("/", { acceptLanguage: "en-US,en;q=0.9" }))

  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), "https://afftraff.io/en/affiliate")
})

test("falls back to English for unsupported browser languages", async () => {
  const proxy = await loadProxy()

  for (const acceptLanguage of ["tr-TR,tr;q=0.9", "de-DE,de;q=0.9"]) {
    const response = proxy(createRequest("/", { acceptLanguage }))

    assert.equal(response.status, 307)
    assert.equal(response.headers.get("location"), "https://afftraff.io/en/affiliate")
  }
})

test("redirects to Russian when English is listed before Russian", async () => {
  const proxy = await loadProxy()

  const response = proxy(createRequest("/", { acceptLanguage: "en-US,en;q=0.9,ru;q=0.8" }))

  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), "https://afftraff.io/ru/affiliate")
})

test("ignores Russian when the browser explicitly gives it zero quality", async () => {
  const proxy = await loadProxy()

  const response = proxy(createRequest("/", { acceptLanguage: "ru;q=0,en-US;q=0.9" }))

  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), "https://afftraff.io/en/affiliate")
})

test("passes through existing localized audience paths", async () => {
  const proxy = await loadProxy()

  for (const pathname of ["/ru/affiliate/blog", "/en/affiliate/blog"]) {
    const response = proxy(createRequest(pathname, { acceptLanguage: "ru-RU,ru;q=0.9" }))

    assert.equal(response.status, 200)
    assert.equal(response.headers.get("location"), null)
  }
})

test("keeps explicit URL language when only audience is missing", async () => {
  const proxy = await loadProxy()

  const response = proxy(createRequest("/ru/blog", { acceptLanguage: "en-US,en;q=0.9" }))

  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), "https://afftraff.io/ru/affiliate/blog")
})

test("ignores stale preferred language cookies on unlocalized access", async () => {
  const proxy = await loadProxy()

  const response = proxy(
    createRequest("/", {
      acceptLanguage: "ru-RU,ru;q=0.9,en;q=0.8",
      cookie: "preferred_lang=en",
    }),
  )

  assert.equal(response.status, 307)
  assert.equal(response.headers.get("location"), "https://afftraff.io/ru/affiliate")
})
