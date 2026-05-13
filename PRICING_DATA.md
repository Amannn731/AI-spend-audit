# PRICING_DATA.md — AI Tool Pricing Reference

> Last updated: May 2025. Prices sourced from official vendor pricing pages.
> SpendLens uses these figures in its audit engine (`src/app/results/page.tsx`).

---

## How SpendLens Uses This Data

Each tool entry maps to a `ToolConfig` object in the audit engine:
- `pricePerSeat` → monthly cost per user on the selected plan
- `freeSeats` → seats included before per-seat billing kicks in
- `category` → used to group savings recommendations

Savings are calculated as:savings = (currentSeats - recommendedSeats) × pricePerSeat

---

## Tool Pricing Table

| Tool | Plan | Price/Seat/Month | Free Seats | Notes |
|------|------|-----------------|------------|-------|
| GitHub Copilot | Individual | $10 | 0 | Billed per active user |
| GitHub Copilot | Business | $19 | 0 | SSO + policy controls |
| GitHub Copilot | Enterprise | $39 | 0 | Fine-tuning + audit logs |
| Cursor | Hobby | $0 | 1 | 2,000 completions/mo |
| Cursor | Pro | $20 | 0 | Unlimited completions |
| Cursor | Business | $40 | 0 | Centralised billing |
| ChatGPT | Plus | $20 | 0 | Per user, no team discount |
| ChatGPT | Team | $25 | 0 | Min 2 seats, annual = $20 |
| ChatGPT | Enterprise | Custom | 0 | Negotiated volume pricing |
| Notion AI | Add-on | $10 | 0 | Added to any Notion plan |
| Midjourney | Basic | $10 | 0 | 200 images/mo |
| Midjourney | Standard | $30 | 0 | Unlimited relaxed |
| Midjourney | Pro | $60 | 0 | Stealth + 12 fast hr |
| Grammarly | Business | $15 | 0 | Min 3 seats |
| Perplexity | Pro | $20 | 0 | $200/yr if annual |
| Runway | Standard | $15 | 0 | 625 credits/mo |
| Runway | Pro | $35 | 0 | 2,250 credits/mo |

---

## Default Plan Assumptions in Audit Engine

When a user selects "Startup" stage, SpendLens assumes:
- GitHub Copilot → Business ($19)
- Cursor → Pro ($20)
- ChatGPT → Team ($25)
- Notion AI → Add-on ($10)
- Midjourney → Standard ($30)
- Grammarly → Business ($15)
- Perplexity → Pro ($20)
- Runway → Standard ($15)

---

## Optimisation Triggers

SpendLens flags a tool for review when:
1. **Seat utilisation < 70%** — likely ghost seats paying for inactive users
2. **Overlapping capabilities** — e.g. Cursor + GitHub Copilot both active (flag redundancy)
3. **Plan mismatch** — paying for Enterprise features a Seed startup won't use

---

## Sources

- GitHub Copilot: https://github.com/features/copilot#pricing
- Cursor: https://www.cursor.com/pricing
- ChatGPT: https://openai.com/chatgpt/pricing
- Notion AI: https://www.notion.so/pricing
- Midjourney: https://www.midjourney.com/account
- Grammarly: https://www.grammarly.com/business
- Perplexity: https://www.perplexity.ai/pro
- Runway: https://runwayml.com/pricing