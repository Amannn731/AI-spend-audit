# Architecture

## System Diagram

```mermaid
graph TD
    A[User lands on /] --> B[Clicks Start Free Audit]
    B --> C[/audit - Spend Input Form]
    C --> D[localStorage - Form Persistence]
    C --> E[User clicks Run My Audit]
    E --> F[/results - Audit Engine runs client-side]
    F --> G[POST /api/summary - Anthropic API]
    G --> H[AI Summary returned]
    F --> I[User enters email]
    I --> J[Lead stored + confirmation email sent]
    F --> K[Unique shareable URL generated]
```

## Data Flow

1. User fills form on /audit — tool, plan, seats, monthly spend
2. Form state saved to localStorage on every change
3. On submit, form data saved to localStorage as audit input
4. /results page reads audit input, runs audit engine locally
5. Audit engine applies hardcoded rules per tool and returns recommendations
6. Results page calls /api/summary with audit data
7. API route calls Anthropic claude-opus-4-5 with a structured prompt
8. If API fails, fallback template summary is returned
9. User can enter email to save report

## Why This Stack

- **Next.js** — handles both frontend and API routes in one codebase, no separate backend needed
- **TypeScript** — catches type errors at build time, especially important for the audit engine logic
- **Tailwind CSS** — fast to build polished dark UI, no CSS files to manage
- **Vercel** — zero config deployment, auto-deploys on every push to main
- **localStorage** — no login required, keeps the tool frictionless for cold visitors

## Scaling to 10k Audits/Day

- Move audit results storage to Supabase instead of localStorage only
- Add Redis caching for AI summaries — same tool combinations generate same summaries
- Rate limit API routes with Upstash Redis
- Add a CDN layer for static assets
- Consider edge functions for the summary API to reduce latency globally