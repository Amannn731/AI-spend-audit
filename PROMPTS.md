# PROMPTS.md — Prompt Engineering Reference

> Documents every AI prompt used in SpendLens, the reasoning behind design choices,
> and iteration history. Covers `src/app/api/summary/route.ts` and any client-side prompting.

---

## Prompt 1 — Spend Audit Summary (Primary)

**Location:** `src/app/api/summary/route.ts`  
**Model:** claude-3-haiku-20240307  
**Trigger:** Called on results page load with serialised audit data

### Full Prompt
### Design Decisions

| Decision | Reasoning |
|----------|-----------|
| "frugal CFO" persona | Anchors tone — avoids generic "AI assistant" hedging |
| "Never say consider your needs" | Negative constraint removes the most common LLM cop-out |
| 150-word cap | Forces specificity; long AI responses lose startup founders |
| 3-paragraph structure | Verdict → biggest fix → surprise insight. Maps to how founders scan |
| Numbers injected via template | Grounds the model; reduces hallucinated figures |

---

## Prompt 2 — Fallback Summary (No API Key)

**Location:** `src/app/results/page.tsx` (client-side, static)  
**Trigger:** When API call fails or `ANTHROPIC_API_KEY` is not set
### Why a Fallback Exists

- Vercel preview deploys don't always have the API key set
- Ensures results page is never broken for demo/interview scenarios
- Gives evaluators a working product even in zero-config environments

---

## Prompt Iteration Log

### v1 — Original (too vague)
**Problem:** Produced 400-word essays with no specific numbers.

### v2 — Added word limit
**Problem:** Still hedged ("you may want to consider..."). Not CFO-like.

### v3 — Added persona + negative constraints (current)  
Added "frugal CFO", "never say consider your needs", "use numbers".  
**Result:** Tight, direct, usable output.

---

## Token Usage Estimates

| Scenario | Input Tokens | Output Tokens | Est. Cost (Haiku) |
|----------|-------------|---------------|-------------------|
| 8 tools, Seed stage | ~320 | ~180 | ~$0.0001 |
| 8 tools, Series A | ~340 | ~200 | ~$0.0001 |
| Monthly (1,000 audits) | ~330,000 | ~190,000 | ~$0.08 |

Haiku pricing: $0.25/M input, $1.25/M output (as of May 2025)

---

## Prompt Guardrails

- No user PII is ever sent to the API — only aggregated spend numbers
- Tool names are passed but no company names or user identities
- All prompt inputs are server-side interpolated — no client prompt injection possible