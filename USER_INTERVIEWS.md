# USER_INTERVIEWS.md — User Research & Interviews

> Documents user research conducted during the SpendLens build.
> Includes interview summaries, key insights, and how findings shaped the product.

---

## Research Goals

1. Validate that AI tool sprawl is a real, felt pain for startup founders
2. Understand how founders currently track AI spend (if at all)
3. Identify which tools appear most frequently in small team stacks
4. Learn what "useful output" looks like — what would make them act on results

---

## Interview Summary

### Interview 1

**Profile:** Solo founder, 18-month-old B2B SaaS, 4-person team  
**Date:** May 9, 2025  
**Format:** 20-minute WhatsApp voice call

**Key quotes (paraphrased):**
- "I honestly don't know what we're paying for AI right now. I'd have to check three different cards."
- "We have Copilot and Cursor both running. I keep meaning to pick one."
- "If something told me the exact number I was wasting, I'd fix it that day."

**Insights:**
- Spend is spread across personal cards, not centralised
- Overlap between Cursor and Copilot is common and unresolved
- Urgency is created by a concrete dollar figure, not a percentage

---

### Interview 2

**Profile:** CTO, Seed-stage fintech, 11-person team  
**Date:** May 9, 2025  
**Format:** 15-minute call

**Key quotes (paraphrased):**
- "Our engineers just expense whatever they want. I find out at the end of the month."
- "ChatGPT Plus is on like 6 people's personal accounts. We should just get Team."
- "I don't need a dashboard. I need a one-time audit I can run before our board meeting."

**Insights:**
- Bottom-up AI adoption means CTOs lose visibility quickly
- ChatGPT Plus vs Team arbitrage is a real, common inefficiency
- "One-time audit" framing resonates more than "ongoing monitoring" for CTOs

---

### Interview 3

**Profile:** Operations lead, Series A startup, 28-person team  
**Date:** May 10, 2025  
**Format:** Async — 8 questions via Notion doc, responses returned same day

**Key quotes (paraphrased):**
- "We did a manual audit in a spreadsheet last quarter. It took me two days."
- "The hardest part wasn't the numbers — it was figuring out who was actually using what."
- "We found three tools nobody had logged into in 60 days. Pure waste."
- "A shareable link I could send to our CFO would be useful."

**Insights:**
- Manual audits are painful enough that people remember doing them
- Utilisation (who's actually using it) is as important as seat count
- Shareable results are a must-have for ops leads who need to get sign-off

---

### Interview 4

**Profile:** Indie hacker, solo, 6 months post-launch  
**Date:** May 10, 2025  
**Format:** Twitter DM thread

**Key quotes (paraphrased):**
- "I use like 8 AI tools. Some I haven't opened in weeks."
- "Midjourney I pay for every month but I only really use it for launches."
- "I'd want to know which ones I could pause vs cancel."

**Insights:**
- Pause vs cancel distinction matters — some tools are seasonal
- Indie hackers are cost-conscious but forget to audit
- "Haven't opened in weeks" is a proxy for utilisation worth capturing in the form

---

### Interview 5

**Profile:** Founder, pre-seed, 2-person team  
**Date:** May 11, 2025  
**Format:** 10-minute in-person chat

**Key quotes (paraphrased):**
- "We're too small to have this problem yet, but I can see it coming."
- "When we hire our first 3 engineers, I want to have a policy ready."
- "Cursor or Copilot — which one should we standardise on? That's the real question."

**Insights:**
- Pre-seed founders are thinking ahead — tool standardisation is a real concern
- "Which tool should we pick" is a question SpendLens could answer with benchmark data
- Even 2-person teams think about this problem

---

## Key Themes Across All Interviews

| Theme | Frequency | Product Impact |
|-------|-----------|---------------|
| Spend spread across personal cards | 4/5 | Explains why self-reported form works — no integration possible |
| Cursor + Copilot overlap | 3/5 | Built overlap detection into audit engine |
| Concrete dollar figure drives action | 5/5 | Made savings hero the first thing on results page |
| One-time audit preferred over dashboard | 4/5 | Kept product as a tool, not a SaaS dashboard |
| Shareable results needed | 2/5 | Added to post-MVP roadmap |
| Utilisation is key signal | 4/5 | Built seat utilisation slider into audit form |

---

## What Changed Based on Research

### Added to MVP
- Savings hero (large $ figure) at top of results — driven by insight #3
- Overlap flag for Cursor + Copilot — driven by interview 1 and 2
- Utilisation slider on form — driven by interview 3 and 4

### Moved to Post-MVP
- Shareable results link — validated as needed but cut for time
- "Pause vs cancel" recommendation — interview 4 insight, needs more research
- Tool standardisation recommendation — interview 5 insight, needs benchmark data

### Killed
- Dashboard/history view — interviews consistently preferred one-time audit
- Integration with expense tools — too much friction for the value at MVP stage

---

## Follow-Up Questions for Next Research Round

1. Would you pay $29/month for monthly re-audits with history?
2. What would make you share the results page with your co-founder or CFO?
3. Which tools do you wish SpendLens covered that aren't on the list?
4. Would benchmark data ("startups like yours average $180/month") change your behaviour?