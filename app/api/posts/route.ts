import { NextResponse } from 'next/server';

// Node.js runtime (not edge) handles WordPress headers better
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'es';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '6';

  try {
    const prefix = lang === 'en' ? '/en' : '';
    const wpUrl = `https://3rcore-server.com.pe${prefix}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_fields=title,date,link,slug,yoast_head_json`;

    const res = await fetch(wpUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'es-PE,es;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://3rcore-server.com.pe/',
        'Origin': 'https://3rcore-server.com.pe',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`WP API ${res.status}:`, errorText.slice(0, 300));

      // 403 fallback: try minimal headers (some WAFs block extra headers)
      if (res.status === 403) {
        const fallback = await fetch(wpUrl, {
          headers: { 'Accept': 'application/json' },
          cache: 'no-store',
        });

        if (fallback.ok) {
          const fallbackData = await fallback.json();
          const totalPages = fallback.headers.get('X-WP-TotalPages') || '1';
          const total = fallback.headers.get('X-WP-Total') || '0';
          const postsArray = Array.isArray(fallbackData) ? fallbackData : [];
          return NextResponse.json(
            { posts: postsArray, totalPages: parseInt(totalPages), total: parseInt(total) },
            { headers: { 'Cache-Control': 'public, s-maxage=60' } }
          );
        }
      }

      return NextResponse.json(
        { error: 'WordPress API error', status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    const totalPages = res.headers.get('X-WP-TotalPages') || '1';
    const total = res.headers.get('X-WP-Total') || '0';
    const postsArray = Array.isArray(data) ? data : [];

    return NextResponse.json(
      { posts: postsArray, totalPages: parseInt(totalPages), total: parseInt(total) },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch posts',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}