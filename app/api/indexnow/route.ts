import { NextRequest, NextResponse } from "next/server"

const INDEXNOW_KEY = "20cdaaacbcde738724ae0cf7fc05ebdb"
const HOST = "3rcore.com"
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
]

const STATIC_URLS = [
  "https://3rcore.com/es",
  "https://3rcore.com/en",
  "https://3rcore.com/es/servicios",
  "https://3rcore.com/en/servicios",
  "https://3rcore.com/es/servicios/branding",
  "https://3rcore.com/en/servicios/branding",
  "https://3rcore.com/es/servicios/web-development",
  "https://3rcore.com/en/servicios/web-development",
  "https://3rcore.com/es/servicios/socialmedia",
  "https://3rcore.com/en/servicios/socialmedia",
  "https://3rcore.com/es/servicios/google-ads",
  "https://3rcore.com/en/servicios/google-ads",
  "https://3rcore.com/es/posicionamiento-seo",
  "https://3rcore.com/en/posicionamiento-seo",
  "https://3rcore.com/es/nosotros",
  "https://3rcore.com/en/nosotros",
  "https://3rcore.com/es/preguntas",
  "https://3rcore.com/en/preguntas",
  "https://3rcore.com/es/blogs",
  "https://3rcore.com/en/blogs",
]

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const auth = url.searchParams.get("key")
  if (auth !== INDEXNOW_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const customUrl = url.searchParams.get("url")
  const urlList = customUrl ? [customUrl] : STATIC_URLS

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }

  const results = await Promise.all(
    ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        return { endpoint, status: res.status, ok: res.ok }
      } catch (e: any) {
        return { endpoint, status: 0, ok: false, error: String(e?.message ?? e) }
      }
    })
  )

  return NextResponse.json({
    ok: true,
    submitted: urlList.length,
    urls: urlList,
    results,
  })
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-indexnow-key")
  if (auth !== INDEXNOW_KEY) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const urlList: string[] = Array.isArray(body?.urls) && body.urls.length > 0 ? body.urls : STATIC_URLS

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }

  const results = await Promise.all(
    ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        return { endpoint, status: res.status, ok: res.ok }
      } catch (e: any) {
        return { endpoint, status: 0, ok: false, error: String(e?.message ?? e) }
      }
    })
  )

  return NextResponse.json({
    ok: true,
    submitted: urlList.length,
    urls: urlList,
    results,
  })
}
