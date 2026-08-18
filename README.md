# Aahaar frontend

Staff dashboard + guest QR menu. Product overview and every feature: **[../README.md](../README.md)** and **[../docs/features/](../docs/features/README.md)**.

## Run

Needs the API on **http://localhost:8001** (see `aahaar-be`).

```bash
npm install
npm run dev
```

Vite: **http://localhost:5174** — proxies `/api` and `/socket.io` to the API.

```bash
npm run preparepush   # lint + typecheck before you push
```

## Stack

React 19, TypeScript, Vite, styled-components, TanStack Query, Socket.IO client, Clerk (optional), PWA (`public/sw.js`, `manifest.webmanifest`).
