// Vercel Routing Middleware: protects /admin with a username and password.
// Set ADMIN_USER and ADMIN_PASS in Vercel > Project > Settings > Environment Variables.
export const config = { matcher: ['/admin', '/admin.html', '/admin/:path*'] };

function unauthorized(message) {
  return new Response(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Ilm Card Admin", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
}

// constant-time string comparison
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export default function middleware(request) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;
  if (!user || !pass) {
    return new Response('Admin portal is locked: set ADMIN_USER and ADMIN_PASS in Vercel.', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme !== 'Basic' || !encoded) return unauthorized('Login required.');
  let decoded = '';
  try { decoded = atob(encoded); } catch { return unauthorized('Login required.'); }
  const i = decoded.indexOf(':');
  const u = decoded.slice(0, i);
  const p = decoded.slice(i + 1);
  if (i < 0 || !safeEqual(u, user) || !safeEqual(p, pass)) return unauthorized('Wrong username or password.');
  // returning nothing lets the request continue to /admin
}
