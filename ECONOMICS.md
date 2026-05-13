# ECONOMICS.md — Unit Economics & Business Model

> Documents the cost structure, revenue model, and unit economics for SpendLens.
> All figures are estimates based on current pricing as of May 2025.

---

## Business Model Summary

SpendLens is a freemium SaaS tool. The free tier drives acquisition via
word-of-mouth and viral sharing of audit results. Paid tiers monetise the
subset of founders who want ongoing monitoring, not just a one-time audit.

---

## Cost to Serve (Per Audit)

### AI API Cost (Claude Haiku)

| Component | Tokens | Cost |
|-----------|--------|------|
| Input (prompt + audit data) | ~330 tokens | $0.000083 |
| Output (summary, ~180 tokens) | ~180 tokens | $0.000225 |
| **Total per audit** | ~510 tokens | **~$0.0003** |

Haiku pricing: $0.25/M input tokens, $1.25/M output tokens

### Infrastructure Cost (Vercel)

| Tier | Monthly Cost | Audits Supported |
|------|-------------|-----------------|
| Hobby (current) | $0 | ~100,000 function calls |
| Pro | $20/month | Unlimited + analytics |

### Total Cost Per Audit

| Scale | AI Cost | Infra Cost | Total |
|-------|---------|------------|-------|
| 100 audits/month | $0.03 | ~$0.00 | **$0.03** |
| 1,000 audits/month | $0.30 | ~$0.02 | **$0.32** |
| 10,000 audits/month | $3.00 | ~$0.20 | **$3.20** |

Cost per audit at scale: **< $0.001**. Effectively zero.

---

## Revenue Model

### Tier 1 — Free
- One audit per session
- Basic savings estimate + AI summary
- No account required
- **Revenue: $0**
- **Purpose: acquisition, word of mouth**

### Tier 2 — Pro ($29/month)
- Unlimited audits
- Audit history (last 6 months)
- Shareable results link
- PDF/email report export
- **Target: individual founders, freelance CTOs**

### Tier 3 — Team ($99/month)
- Everything in Pro
- Up to 5 team members
- Slack integration for monthly re-audit reminders
- Benchmark data vs. similar-stage startups
- **Target: ops leads at Series A startups**

---

## Unit Economics at Scale

### Assumptions
- Free → Pro conversion rate: 5%
- Pro → Team upgrade rate: 15%
- Monthly churn: 8% (early SaaS benchmark)
- CAC (content + outreach, no paid ads): $15

### At 1,000 Monthly Active Users

| Metric | Value |
|--------|-------|
| Free users | 950 |
| Pro subscribers | 50 × $29 | = $1,450 MRR |
| Team subscribers | 8 × $99 | = $792 MRR |
| **Total MRR** | **$2,242** |
| AI + infra costs | ~$25 |
| **Gross margin** | **~98.9%** |

### At 10,000 Monthly Active Users

| Metric | Value |
|--------|-------|
| Pro subscribers | 500 × $29 | = $14,500 MRR |
| Team subscribers | 75 × $99 | = $7,425 MRR |
| **Total MRR** | **$21,925** |
| AI + infra costs | ~$230 |
| **Gross margin** | **~98.9%** |

Software gross margins hold regardless of scale — the AI cost is negligible.

---

## Payback Period

| Scenario | CAC | ARPU | Payback |
|----------|-----|------|---------|
| Pro user | $15 | $29/month | 0.5 months |
| Team user | $15 | $99/month | 0.15 months |

Near-instant payback is achievable because CAC is low (content-driven)
and the product solves an immediately quantifiable problem.

---

## Sensitivity Analysis

### What breaks the model

| Variable | Threshold | Impact |
|----------|-----------|--------|
| Conversion rate drops to 1% | MRR falls 80% | Critical |
| Churn rises to 20%/month | LTV halves | Serious |
| Anthropic raises Haiku price 10x | Cost/audit = $0.003 | Negligible |
| Vercel Pro required at 500 users | +$20/month fixed cost | Negligible |

The model is resilient to AI cost increases but sensitive to conversion rate.
The core risk is a weak free-to-paid hook — mitigated by making the
paid features (history, sharing, benchmarks) genuinely useful.

---

## LTV Calculation

Assuming 8% monthly churn → average customer lifetime = 12.5 months

| Tier | ARPU | Lifetime | LTV |
|------|------|----------|-----|
| Pro | $29 | 12.5 months | $362 |
| Team | $99 | 12.5 months | $1,237 |

**LTV:CAC ratio**
- Pro: $362 / $15 = **24x**
- Team: $1,237 / $15 = **82x**

Both are well above the 3x minimum considered healthy for SaaS.

---

## Path to Ramen Profitable

| Monthly Active Users | MRR | Founder Take-Home |
|---------------------|-----|------------------|
| 500 | ~$1,100 | Side project territory |
| 1,500 | ~$3,300 | Ramen profitable (India) |
| 3,000 | ~$6,600 | Comfortable solo founder |

Ramen profitability is achievable at ~1,500 MAU with current pricing.
No external funding required to reach this milestone.