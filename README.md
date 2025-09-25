# Agentic CX Demo

A simple customer web UI that proxies messages to the Athena Cognitive Desktop and listens for real-time updates via SSE. Useful for demonstrating end-to-end agent/customer flows.

## Quick start

Prereqs:
- Node.js 18+ and npm

Setup and run the server:

```bash
# In Agentic CX Demo/server/
npm install
npm start
(base) m_379625@AMBGB000697 server % COMPANY_NAME="Acme" node app.js
```

Open the customer UI:
- http://localhost:4002/
- Recommended with parameters: `http://localhost:4002/?cust=GB13820473&athena=http://localhost:3001`
  - `athena` points to the Athena Desktop base URL
  - `cust` selects the customer ID (`random` picks from a demo pool)

## How it works

- The client subscribes to Athena’s SSE stream at `/api/v1/stream/customer-360/:id` using `EventSource`.
- When the user sends a message, the server forwards it to Athena via `POST /chat/send`, which proxies to Athena `/api/v1/external-chat`.
- The client de-duplicates streamed replies using `traceId` and shows an immediate HTTP fallback reply if present.
- An initial on-open welcome bubble is rendered client-side for UX; it’s independent of Athena.

## API (server)

- POST `/chat/send`
  - Body: `{ customerId, message, athenaBaseUrl }`
  - Forwards to `{athenaBaseUrl}/api/v1/external-chat` and returns the JSON response.

## Customer IDs and params

- Demo ID pool: `GB26669607`, `GB13820473`, `GB22446688`, `GB77553311`, `GB99001234`.
- URL params:
  - `athena`: Base URL to Athena Desktop (default `http://localhost:3001`)
  - `cust`: Specific ID or `random`

## Pairing with Athena Desktop

Start Athena Desktop first:
- http://localhost:3001/

Then open the CX Demo with:
- http://localhost:4002/?athena=http://localhost:3001&cust=random

## Troubleshooting

- No responses? Ensure Athena Desktop is running and reachable at the `athena` URL.
- Seeing two replies? The client deduplicates by `traceId`; if you also display the HTTP `botReply`, ensure it’s not suppressed or shown twice.
- To suppress server-generated bot replies at source, set `SUPPRESS_AUTO_BOT_REPLY=true` in Athena’s `.env`.

## License

MIT
