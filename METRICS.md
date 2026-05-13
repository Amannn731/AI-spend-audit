# METRICS.md — Success Metrics & Analytics

> Defines the key metrics SpendLens tracks, how success is measured,
> and what good looks like at each stage of growth.

---

## North Star Metric

**Audits completed per week**

An audit completed = user reached the results page with valid data.
This captures the full value delivery moment — not just visits or form starts.

---

## Acquisition Metrics

| Metric | Target (Week 1) | Target (Month 1) |
|--------|----------------|-----------------|
| Unique visitors | 500 | 2,000 |
| Audit starts (form loads) | 150 | 600 |
| Audits completed (results page) | 50 | 200 |
| Form completion rate | 33% | 35% |
| Traffic sources tracked | UTM on all launch posts | — |

---

## Engagement Metrics

| Metric | Target | How Measured |
|--------|--------|-------------|
| Time on results page | > 90 seconds | Vercel Analytics |
| AI summary load rate | > 80% of audits | API route logs |
| Fallback summary trigger rate | < 20% | API error logs |
| Return visits (same device) | > 15% | Vercel Analytics |

---

## Product Health Metrics

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| Results page error rate | < 1% | Broken results = zero trust |
| API summary latency (p95) | < 4 seconds | Founders won't wait longer |
| Form drop-off rate | < 65% | High drop-off = form is too long |
| localStorage restore rate | > 90% | Persistence must be reliable |

---

## Business Metrics (Post-Launch)

| Metric | Formula | Target (Month 3) |
|--------|---------|-----------------|
| Free → Pro conversion | Pro signups / audits completed | 5% |
| MRR | Pro × $29 + Team × $99 | $500 |
| Churn rate | Cancelled / active subscribers | < 8%/month |
| LTV | ARPU / churn rate | > $300 |
| CAC | Total acquisition spend / new users | < $20 |

---

## Audit Quality Metrics

| Metric | Target | How Measured |
|--------|--------|-------------|
| Average savings identified | > $150/month | Aggregate from results page |
| % audits finding > $100 waste | > 60% | Results page data |
| Most flagged tool overlap | Cursor + Copilot | Audit engine logs |
| Average tools per audit | > 4 | Form submission data |

---

## Launch Day Dashboard (Manual)

Track these manually on launch day via Vercel Analytics + API logs:

- [ ] Total visitors
- [ ] Audit form loads
- [ ] Audits completed
- [ ] AI summary successes vs fallbacks
- [ ] Any 500 errors on `/api/summary`
- [ ] Top traffic source (HN / Twitter / direct)

---

## What Bad Looks Like

| Signal | Diagnosis | Fix |
|--------|-----------|-----|
| Form completion < 20% | Form is too long or confusing | Cut fields, add progress bar |
| AI summary load < 50% | API key issue or Haiku timeout | Check env vars, add retry logic |
| Avg time on results < 30s | Results aren't useful or credible | Improve savings breakdown UI |
| Zero return visits | One-time utility, no hook | Add email report, re-audit reminder |
| Bounce rate > 80% on landing | Hero copy not landing | A/B test headline |

---

## Analytics Setup

- **Vercel Analytics** — enabled on all pages, zero config
- **UTM parameters** — added to all launch post links
  - HN post: `?utm_source=hackernews&utm_medium=show_hn`
  - Twitter: `?utm_source=twitter&utm_medium=social`
  - Indie Hackers: `?utm_source=indiehackers&utm_medium=community`
- **No third-party tracking** — no Google Analytics, no cookies, no consent banner needed