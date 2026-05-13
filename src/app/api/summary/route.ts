import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { stage, totalSpend, totalSavings, tools } = body

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'No API key' }, { status: 500 })
  }

  const toolBreakdown = tools
    .map((t: { name: string; seats: number; utilisation: number }) =>
      `${t.name}: ${t.seats} seats, ${Math.round(t.utilisation * 100)}% utilisation`)
    .join('\n')

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system: `You are a frugal CFO advisor for early-stage startups. Give sharp, specific, non-generic advice about AI tool spending. Never say "consider your needs" or "it depends". Be direct. Use numbers.`,
    messages: [{
      role: 'user',
      content: `Stage: ${stage}\nMonthly spend: $${totalSpend}\nSavings identified: $${totalSavings}/month\n\nTools:\n${toolBreakdown}\n\nGive a 3-paragraph audit. Max 150 words. No bullets. No hedging.`
    }]
  })

  const summary = message.content[0].type === 'text' ? message.content[0].text : ''
  return NextResponse.json({ summary })
}