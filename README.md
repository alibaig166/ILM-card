# Ilm Card: website + admin portal

```
index.html        public website (scroll film + sections)
img/              the seven photos
admin/index.html  admin portal (dashboard, students, vouchers, shops, sponsorships, exam days)
middleware.js     password-protects /admin (Vercel Routing Middleware)
vercel.json       clean URLs, caching and security headers
robots.txt        keeps /admin out of search engines
```

No build step. It is a static site plus one middleware file.

## Deploy on Vercel (5 minutes)

**Option A: GitHub (recommended)**
1. Create a new GitHub repository and upload everything in this folder.
2. Go to vercel.com > Add New > Project > import the repository.
3. Framework preset: **Other**. Leave build and output settings empty.
4. Before deploying, open **Environment Variables** and add:
   - `ADMIN_USER` = the admin username you want
   - `ADMIN_PASS` = a strong password (12+ characters)
5. Click **Deploy**.

**Option B: Vercel CLI**
```
npm i -g vercel
cd ilm-card-vercel
vercel                      # first deploy, answer the prompts
vercel env add ADMIN_USER   # choose Production
vercel env add ADMIN_PASS
vercel --prod
```

After changing environment variables, redeploy so they take effect.

## Using it
- Website: `https://<your-project>.vercel.app/`
- Admin: `https://<your-project>.vercel.app/admin` (the browser asks for the username and password)

## Important: what the admin portal is today
- It runs on **demo data stored in each browser** (localStorage). Two team members will not see each other's changes, and clearing the browser resets it. That is fine for the pitch demo.
- Voucher numbers are generated in the browser. In production they must be created and checked on the server.
- To take real students, connect a database (for example Vercel Postgres/Neon or Supabase) and move the data functions in `admin/index.html` (`load`, `save`, and the actions) to API routes. Keep written guardian consent and store as little child data as possible.
- If `ADMIN_USER` / `ADMIN_PASS` are missing, /admin stays locked with a message instead of opening.
