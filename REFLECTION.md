# REFLECTION.md — Project Retrospective

> Personal reflection on building SpendLens for the Credex internship assignment.
> Written May 13, 2025.

---

## What I Set Out to Build

A tool that solves a real problem I noticed: early-stage startups blindly paying for
AI subscriptions without tracking utilisation or overlap. SpendLens was meant to be
a 10-minute audit that gives a founder a concrete number — "you're wasting $X/month" —
and tells them exactly what to cut.

---

## What I Actually Built

- A Next.js app with a landing page, multi-step audit form, and results page
- An audit engine that calculates per-tool savings based on seat utilisation
- An AI summary via Claude Haiku that gives a CFO-style verdict in plain English
- localStorage persistence so the form survives accidental refreshes
- A fallback summary so the results page never breaks without an API key
- Deployed on Vercel with a live URL from day one

The core loop works: fill the form → see your waste → get an AI verdict.

---

## What I'd Do Differently

### 1. Start with the audit engine, not the UI
I spent day one on the landing page. The audit engine — the actual value — came on day three.
Next time: build the hard logic first, wrap UI around it after.

### 2. Seed the form with realistic defaults earlier
Empty inputs made early testing slow. Pre-filling with a "typical Seed startup" profile
would have surfaced edge cases faster.

### 3. Add a shareable results link from the start
Right now results live in localStorage. A `/results/[id]` route with a short URL would
make the tool 10x more shareable — founders would send it to their co-founders.
I knew this was valuable but cut it for time.

### 4. Talk to one real founder before building
I made assumptions about what inputs founders care about (seats, plan tier).
A 20-minute call before day one would have validated or killed those assumptions cheaply.

---

## Hardest Part

Getting the AI summary to be useful, not generic. The first two prompt versions
produced hedged, 400-word non-answers. The breakthrough was the "frugal CFO" persona
combined with explicit negative constraints ("never say consider your needs").
Prompt engineering turned out to be as important as the code.

---

## What I'm Proud Of

- The fallback summary — small detail, but it means the product never looks broken
- The savings calculation is genuinely useful, not hand-wavy
- Shipping a live URL on day one and iterating on top of it
- The audit form UX: plan selector + seat slider feels fast to fill out

---

## If I Had Two More Weeks

1. Real auth + persistent audit history (Supabase)
2. Shareable results links
3. Benchmark data — "startups at your stage average $180/month"
4. Email report export
5. Actual user interviews with 5 founders to validate the tool selector

---

## Key Takeaway

Shipping a working, deployed product in 5 days is mostly a prioritisation problem.
The temptation is to polish things that don't matter (animations, colour tweaks)
before the core loop works. Ruthless scope-cutting is the skill.