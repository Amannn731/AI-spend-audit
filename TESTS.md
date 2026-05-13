# TESTS.md — Testing Strategy & Test Cases

> Documents the testing approach for SpendLens, including manual test cases,
> edge cases validated, and notes on automated testing.

---

## Testing Approach

SpendLens uses a combination of:
1. **Manual functional testing** — every user flow tested in browser
2. **Edge case validation** — boundary inputs tested in the audit engine
3. **API route testing** — summary endpoint tested with curl + Postman
4. **CI lint check** — GitHub Actions runs `next lint` on every push

---

## Manual Test Cases

### Landing Page

| Test | Expected | Result |
|------|----------|--------|
| Load `/` on desktop | Hero, features, CTA visible | ✅ Pass |
| Load `/` on mobile (375px) | No horizontal scroll, CTA tappable | ✅ Pass |
| Click "Start Free Audit" | Navigates to `/audit` | ✅ Pass |

### Audit Form (`/audit`)

| Test | Expected | Result |
|------|----------|--------|
| Load form fresh | All tools unchecked, sliders at default | ✅ Pass |
| Select 3 tools, set seats, refresh page | Form state restored from localStorage | ✅ Pass |
| Select no tools, click Submit | Validation error shown, no navigation | ✅ Pass |
| Select all 8 tools | All seat sliders visible and independent | ✅ Pass |
| Set seats to 1 on all tools | Minimum seat count accepted | ✅ Pass |
| Set seats to 50 on all tools | Maximum seat count accepted | ✅ Pass |
| Change stage from Seed to Series A | Plan tier updates, pricing recalculates | ✅ Pass |

### Results Page (`/results`)

| Test | Expected | Result |
|------|----------|--------|
| Load with valid audit data | Savings hero, per-tool breakdown visible | ✅ Pass |
| Load with no localStorage data | Redirects to `/audit` | ✅ Pass |
| API key set, valid data | AI summary renders within 3s | ✅ Pass |
| API key missing | Fallback summary renders, no error shown | ✅ Pass |
| Zero savings identified | Hero shows $0, no false positives | ✅ Pass |
| All tools at 100% utilisation | No tools flagged for reduction | ✅ Pass |

### API Route (`/api/summary`)

| Test | Expected | Result |
|------|----------|--------|
| POST with valid payload | 200 + summary string returned | ✅ Pass |
| POST with missing fields | 400 error returned | ✅ Pass |
| POST with no API key set | 500 with clear error message | ✅ Pass |
| Curl from terminal | Response within 4s on Haiku | ✅ Pass |

---

## Edge Cases Validated

### Audit Engine

| Edge Case | Behaviour |
|-----------|-----------|
| 0 seats selected | Treated as 1 seat minimum |
| Savings > monthly spend | Capped at monthly spend (can't save more than you spend) |
| Single tool selected | Breakdown shows one row, no divide-by-zero |
| All tools at max seats | Savings calculated correctly across all 8 |
| Stage = Enterprise | Highest per-seat prices applied, no crash |

### localStorage

| Edge Case | Behaviour |
|-----------|-----------|
| Corrupted JSON in storage | Caught, form resets to defaults |
| Storage quota exceeded | Graceful fallback, no white screen |
| Private browsing mode | Form works, persistence silently disabled |

---

## API Curl Test

```bash
curl -X POST https://ai-spend-audit-lemon.vercel.app/api/summary \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "Seed",
    "totalSpend": 420,
    "totalSavings": 180,
    "tools": [
      { "name": "GitHub Copilot", "seats": 10, "utilisation": 0.4 },
      { "name": "ChatGPT Team", "seats": 15, "utilisation": 0.6 }
    ]
  }'
```

Expected response:
```json
{
  "summary": "Your $420/month AI spend is high for a Seed stage startup..."
}
```

---

## Automated Testing (CI)

GitHub Actions runs on every push to `main`:
- `next lint` — catches type errors and unused imports
- `next build` — confirms production build succeeds with no errors

See `.github/workflows/ci.yml` for full workflow definition.

---

## Known Limitations

- No unit tests for the audit engine functions (would use Jest + React Testing Library)
- No Playwright/Cypress E2E tests (time constraint)
- API route not load tested (Haiku rate limits not validated under concurrency)

These would be the first additions in a post-MVP testing sprint.