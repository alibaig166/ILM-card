# Ilm Card: website + admin portal (flat layout, no folders)

index.html     public website
admin.html     admin portal, opens at /admin (password protected)
*.jpg          the seven photos
middleware.js  password lock for /admin
vercel.json    clean URLs and headers

Vercel > Project > Settings > Environment Variables: add ADMIN_USER and ADMIN_PASS, then redeploy.
