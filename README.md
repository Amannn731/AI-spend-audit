# SpendLens — Free AI Spend Auditor

SpendLens helps startup founders and engineering managers instantly audit their AI tool spend — Cursor, ChatGPT, Claude, Copilot, and more — and find exactly where they're overspending.

**Live demo:** https://ai-spend-audit-lemon.vercel.app

## Screenshots

> Add screenshots here

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Decisions

1. **Next.js over plain React** — needed API routes for the AI summary endpoint without a separate backend
2. **localStorage for form persistence** — no login required, keeps UX frictionless
3. **Hardcoded audit rules over AI** — pricing logic needs to be deterministic and defensible; AI is only used for the summary paragraph
4. **Supabase for lead storage** — free tier, no infrastructure to manage, instant setup
5. **Tailwind CSS** — fastest way to build a polished dark UI without a design system

## Deploy

Deployed on Vercel. Push to main auto-deploys.