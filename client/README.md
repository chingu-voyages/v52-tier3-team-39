# Rayvolution

Client application built with Next.js

## Major Dependencies

- React 19
- Next 15
- ESLint
- Tailwind CSS

## Getting Started

#### Environment variables

Create a `.env` file in the root of the `client` directory:

```
SERVER_URL=http://localhost:4000/
NEXT_PUBLIC_LACITY_KEY=[key]
GOOGLE_CLIENT_ID=[key]
GOOGLE_CLIENT_SECRET=[key]
AUTH_SECRET=[key]
NEXT_PUBLIC_GOOGLE_API_KEY=[key]
NEXT_PUBLIC_GOOGLE_APPOINTMENTS_MAP_ID=[id]
```

Note: `NEXT_PUBLIC_` is a necessary prefix for any environment variable exposed to the browser.

#### Run app in dev mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
