# HealthSync proxy server

This is a minimal Next.js app that acts as a proxy server for API requests. It's intended to be deployed to Vercel (or run locally) and forward incoming `/api/*` requests to a configured backend.

Configuration
- `API_TARGET` (env) — full URL of the backend to forward requests to (default: `http://localhost:3000`). You can also set `NEXT_PUBLIC_API_TARGET`.

Development

1. Install dependencies:

```powershell
cd server
npm install
```

2. Run dev server:

```powershell
npm run dev
```

By default the proxy forwards to `http://localhost:3000`. Set `API_TARGET` if your backend runs elsewhere.

Deployment to Vercel

1. Push the repo to GitHub.
2. In Vercel create a new project using this `server` folder as the project root (or monorepo configuration pointing to `/server`).
3. Add environment variables in Vercel (Project Settings): `API_TARGET` (if needed).
4. Deploy.

Notes
- This proxy mirrors the path and query string when forwarding (for example `/api/auth/login` -> `${API_TARGET}/api/auth/login`).
- It forwards headers and body; hop-by-hop headers are removed on the response.
- For production it's recommended to point `API_TARGET` to a stable backend and secure environment variables.
