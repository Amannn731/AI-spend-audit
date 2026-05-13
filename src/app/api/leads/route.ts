import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let resendClient: Resend | null = null
function getResend() {
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY)
  return resendClient
}

const rateLimit = new Map<string, number>()


export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const last = rateLimit.get(ip) ?? 0

  if (now - last < 60_000) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  rateLimit.set(ip, now)

  const body = await req.json()
  const { email, totalSavings, totalSpend, honeypot } = body

  if (honeypot) return NextResponse.json({ ok: true })

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    await getResend().emails.send({
      from: 'SpendLens <onboarding@resend.dev>',
      to: email,
      subject: `Your AI Spend Audit — $${totalSavings}/mo in potential savings`,
      html: `
        <h2>Your SpendLens Audit Report</h2>
        <p>You are currently spending <strong>$${totalSpend}/month</strong> on AI tools.</p>
        <p>We identified <strong>$${totalSavings}/month</strong> in potential savings —
        that is <strong>$${totalSavings * 12}/year</strong>.</p>
        ${totalSavings > 500 ? `
        <p><strong>Your savings opportunity is significant.</strong>
        Credex offers discounted AI credits that could help you capture even more savings.
        <a href="https://credex.rocks">Book a free consultation</a></p>
        ` : ''}
        <p>Run another audit anytime at
        <a href="https://ai-spend-audit-lemon.vercel.app">SpendLens</a>.</p>
        <hr/>
        <p style="color:#888;font-size:12px">SpendLens · You received this because you requested an audit report.</p>
      `
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}