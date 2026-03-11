import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }  
) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'es';
  const { slug } = await params; 

  try {
    const prefix = lang === 'en' ? '/en' : '';
    const wpUrl = `https://3rcore-server.com.pe${prefix}/wp-json/wp/v2/posts?slug=${slug}&_fields=title,date,link,slug,content,excerpt,yoast_head_json`;

    const res = await fetch(wpUrl, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'es-PE,es;q=0.9,en;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://3rcore-server.com.pe/',
        'Origin': 'https://3rcore-server.com.pe',
      },
      cache: 'no-store',
    });

    if (!res.ok) return NextResponse.json({ error: 'WordPress API error' }, { status: res.status });

    const data = await res.json();
    if (!data || data.length === 0) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    return NextResponse.json(data[0], {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}