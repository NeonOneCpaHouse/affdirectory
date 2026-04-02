import { NextRequest, NextResponse } from "next/server"

import {
  countArticleView,
  getClientIp,
  hashIp,
  isLikelyBot,
  verifyArticleViewToken,
} from "@/lib/articleViews"

interface ViewRequestBody {
  articleId?: string
  visitId?: string
  token?: string
}

export async function POST(req: NextRequest) {
  try {
    const { articleId, visitId, token } = (await req.json()) as ViewRequestBody

    if (!articleId || !visitId || !token) {
      return NextResponse.json({ error: "Missing payload fields." }, { status: 400 })
    }

    const verifiedToken = verifyArticleViewToken(token, articleId)
    if (!verifiedToken) {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 })
    }

    const result = await countArticleView({
      articleId,
      visitId,
      baseline: verifiedToken.baseline,
      ipHash: hashIp(getClientIp(req.headers)),
      isBot: isLikelyBot({
        userAgent: req.headers.get("user-agent"),
        purpose: req.headers.get("purpose"),
        secPurpose: req.headers.get("sec-purpose"),
        xMiddlewarePrefetch: req.headers.get("x-middleware-prefetch"),
      }),
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to record article view:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
