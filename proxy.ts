import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const isProd = process.env.NODE_ENV === 'production';
  const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
  if (setCookieHeaders.length > 0) {
    response.headers.delete('set-cookie');
    for (const cookie of setCookieHeaders) {
      let updated = cookie;
      if (isProd && !/;\s*Secure/i.test(updated)) {
        updated = `${updated}; Secure`;
      }
      if (!/;\s*SameSite=/i.test(updated)) {
        updated = `${updated}; SameSite=Lax`;
      }
      response.headers.append('set-cookie', updated);
    }
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)'
};