"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ToolEntry {
  toolId: string;
  planId: string;
  seats: number;
  monthlySpend: number;
}

interface FormState {
  tools: ToolEntry[];
  teamSize: number;
  useCase: string;
}

interface AuditResult {
  toolId: string;
  toolName: string;
  currentSpend: number;
  recommendedAction: string;
  savings: number;
  reason: string;
  status: "overspending" | "optimal" | "switch";
}

function runAuditEngine(form: FormState): AuditResult[] {
  const results: AuditResult[] = [];

  for (const tool of form.tools) {
    const { toolId, planId, seats, monthlySpend } = tool;

    if (toolId === "cursor") {
      if (planId === "business" && seats <= 3) {
        const savings = (40 - 20) * seats;
        results.push({ toolId, toolName: "Cursor", currentSpend: monthlySpend, recommendedAction: "Downgrade to Cursor Pro", savings, reason: `With ${seats} seats, Pro ($20/seat) covers all core features. Business adds admin controls only useful for larger teams.`, status: "overspending" });
      } else if (planId === "enterprise" && seats <= 10) {
        const savings = (100 - 40) * seats;
        results.push({ toolId, toolName: "Cursor", currentSpend: monthlySpend, recommendedAction: "Downgrade to Cursor Business", savings, reason: `Enterprise pricing is designed for 10+ seat orgs with SSO needs. Business plan covers your team size.`, status: "overspending" });
      } else {
        results.push({ toolId, toolName: "Cursor", currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "You're on the right Cursor plan for your team size.", status: "optimal" });
      }
    }

    if (toolId === "github_copilot") {
      if (planId === "business" && seats <= 2) {
        const savings = (19 - 10) * seats;
        results.push({ toolId, toolName: "GitHub Copilot", currentSpend: monthlySpend, recommendedAction: "Switch to Individual plan", savings, reason: `Business plan adds org management features not needed for ${seats} users. Individual saves $9/seat/month.`, status: "overspending" });
      } else if (planId === "enterprise" && seats <= 10) {
        const savings = (39 - 19) * seats;
        results.push({ toolId, toolName: "GitHub Copilot", currentSpend: monthlySpend, recommendedAction: "Downgrade to Business plan", savings, reason: `Enterprise adds SAML SSO and audit logs — overkill for a ${seats}-person team.`, status: "overspending" });
      } else if (form.useCase === "coding" && seats >= 3) {
        const cursorCost = 20 * seats;
        if (cursorCost < monthlySpend) {
          results.push({ toolId, toolName: "GitHub Copilot", currentSpend: monthlySpend, recommendedAction: "Consider switching to Cursor Pro", savings: monthlySpend - cursorCost, reason: `Cursor Pro offers a more powerful coding assistant with better context awareness at $${cursorCost}/mo for your team vs $${monthlySpend}/mo.`, status: "switch" });
        } else {
          results.push({ toolId, toolName: "GitHub Copilot", currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "Good value for your team size and use case.", status: "optimal" });
        }
      } else {
        results.push({ toolId, toolName: "GitHub Copilot", currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "You're on the right plan for your team size.", status: "optimal" });
      }
    }

    if (toolId === "claude") {
      if (planId === "max" && seats === 1) {
        results.push({ toolId, toolName: "Claude", currentSpend: monthlySpend, recommendedAction: "Downgrade to Claude Pro", savings: 80, reason: "Claude Max is for power users hitting Pro limits daily. If you're not maxing out Pro's usage, you're paying $80/mo extra for nothing.", status: "overspending" });
      } else if (planId === "team" && seats <= 2) {
        const savings = (30 - 20) * seats;
        results.push({ toolId, toolName: "Claude", currentSpend: monthlySpend, recommendedAction: "Switch to individual Pro plans", savings, reason: `Team plan adds collaboration features unnecessary for ${seats} people. Two Pro plans cost less.`, status: "overspending" });
      } else {
        results.push({ toolId, toolName: "Claude", currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "You're on an appropriate Claude plan.", status: "optimal" });
      }
    }

    if (toolId === "chatgpt") {
      if (planId === "team" && seats <= 2) {
        const savings = (30 - 20) * seats;
        results.push({ toolId, toolName: "ChatGPT", currentSpend: monthlySpend, recommendedAction: "Switch to Plus plans", savings, reason: `ChatGPT Team adds shared workspace and admin console — not worth it for ${seats} users. Two Plus plans are cheaper.`, status: "overspending" });
      } else if (planId === "plus" && form.useCase === "coding") {
        results.push({ toolId, toolName: "ChatGPT", currentSpend: monthlySpend, recommendedAction: "Consider Cursor for coding tasks", savings: 0, reason: "For coding, Cursor Pro ($20/mo) offers deeper IDE integration than ChatGPT Plus at the same price.", status: "switch" });
      } else {
        results.push({ toolId, toolName: "ChatGPT", currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "Reasonable spend for your use case.", status: "optimal" });
      }
    }

    if (toolId === "anthropic_api" || toolId === "openai_api") {
      const name = toolId === "anthropic_api" ? "Anthropic API" : "OpenAI API";
      if (monthlySpend > 500) {
        results.push({ toolId, toolName: name, currentSpend: monthlySpend, recommendedAction: "Talk to Credex about discounted credits", savings: Math.round(monthlySpend * 0.2), reason: `At $${monthlySpend}/mo, you qualify for discounted API credits through Credex — typically 15-25% off retail pricing.`, status: "switch" });
      } else {
        results.push({ toolId, toolName: name, currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "Pay-as-you-go is appropriate at your current usage level.", status: "optimal" });
      }
    }

    if (toolId === "gemini") {
      if (planId === "ultra") {
        results.push({ toolId, toolName: "Gemini", currentSpend: monthlySpend, recommendedAction: "Evaluate if Ultra features justify cost", savings: 10, reason: "Gemini Ultra adds extended context and advanced reasoning. If you're primarily doing writing or research, Pro suffices.", status: "overspending" });
      } else {
        results.push({ toolId, toolName: "Gemini", currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "Good value for Google ecosystem users.", status: "optimal" });
      }
    }

    if (toolId === "windsurf") {
      if (planId === "team" && seats <= 3) {
        const savings = (35 - 15) * seats;
        results.push({ toolId, toolName: "Windsurf", currentSpend: monthlySpend, recommendedAction: "Downgrade to Windsurf Pro", savings, reason: `Team plan is built for larger engineering orgs. ${seats} developers are well served by individual Pro plans.`, status: "overspending" });
      } else {
        results.push({ toolId, toolName: "Windsurf", currentSpend: monthlySpend, recommendedAction: "No change needed", savings: 0, reason: "Appropriate plan for your usage.", status: "optimal" });
      }
    }
  }

  return results;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<AuditResult[]>([]);
  const [form, setForm] = useState<FormState | null>(null);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("spendlens_audit_input");
    if (!saved) { router.push("/audit"); return; }
    const parsed: FormState = JSON.parse(saved);
    setForm(parsed);
    const auditResults = runAuditEngine(parsed);
    setResults(auditResults);
    const spend = parsed.tools.reduce((sum, t) => sum + t.monthlySpend, 0);
    const savings = auditResults.reduce((sum, r) => sum + r.savings, 0);
    setTotalSpend(spend);
    setTotalSavings(savings);
    fetchAISummary(parsed, auditResults, spend, savings);
  }, []);

  const fetchAISummary = async (form: FormState, results: AuditResult[], spend: number, savings: number) => {
    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, results, totalSpend: spend, totalSavings: savings }),
      });
      const data = await res.json();
      setAiSummary(data.summary);
    } catch {
      const toolNames = form.tools.map(t => t.toolId).join(", ");
      setAiSummary(`Your team is currently spending $${spend}/month across ${form.tools.length} AI tools (${toolNames}). Our audit identified $${savings}/month in potential savings — $${savings * 12}/year. ${savings > 0 ? "The biggest opportunity is optimizing your plan selection based on actual team size and usage patterns." : "You're already spending efficiently across your AI stack."}`);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email) return;
    setSubmitted(true);
  };

  const statusColor = (status: AuditResult["status"]) => {
    if (status === "overspending") return "text-red-400 bg-red-400/10 border-red-400/20";
    if (status === "switch") return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
  };

  const statusLabel = (status: AuditResult["status"]) => {
    if (status === "overspending") return "⚠ Overspending";
    if (status === "switch") return "→ Better option exists";
    return "✓ Optimal";
  };

  if (!form) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="text-xl font-bold text-emerald-400">SpendLens</a>
        <a href="/audit" className="text-white/40 text-sm hover:text-white transition">← Edit audit</a>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero savings */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-8 text-center">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">Your audit results</p>
          <div className="text-6xl font-extrabold text-emerald-400 mb-2">${totalSavings}/mo</div>
          <div className="text-white/50 text-lg mb-1">potential monthly savings</div>
          <div className="text-white/30 text-sm">${totalSavings * 12}/year · currently spending ${totalSpend}/mo</div>
        </div>

        {/* AI Summary */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-emerald-400">✦</span> AI-generated summary
          </h2>
          {loadingSummary ? (
            <div className="text-white/30 text-sm animate-pulse">Generating your personalized summary...</div>
          ) : (
            <p className="text-white/70 text-sm leading-relaxed">{aiSummary}</p>
          )}
        </div>

        {/* Per tool breakdown */}
        <h2 className="font-semibold mb-4">Per-tool breakdown</h2>
        <div className="space-y-4 mb-10">
          {results.map((result) => (
            <div key={result.toolId} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-semibold">{result.toolName}</span>
                  <div className="text-white/40 text-sm mt-1">${result.currentSpend}/mo current spend</div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColor(result.status)}`}>
                    {statusLabel(result.status)}
                  </span>
                  {result.savings > 0 && (
                    <div className="text-emerald-400 font-bold mt-2">Save ${result.savings}/mo</div>
                  )}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-sm font-medium mb-1">{result.recommendedAction}</div>
                <div className="text-white/50 text-xs">{result.reason}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Credex CTA for high savings */}
        {totalSavings >= 500 && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-emerald-400 text-lg mb-2">You qualify for Credex credits</h3>
            <p className="text-white/60 text-sm mb-4">At ${totalSavings}/mo in savings potential, Credex can help you capture even more through discounted AI infrastructure credits — typically 15-25% below retail.</p>
            <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-lg transition text-sm">
              Book a free Credex consultation →
            </a>
          </div>
        )}

        {/* Email capture */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          {!submitted ? (
            <>
              <h3 className="font-semibold mb-1">Get your full report by email</h3>
              <p className="text-white/40 text-sm mb-4">We'll send you this audit plus notify you when new savings opportunities appear for your stack.</p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg text-sm transition"
                >
                  Send report
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-emerald-400 text-2xl mb-2">✓</div>
              <p className="font-semibold">Report sent to {email}</p>
              <p className="text-white/40 text-sm mt-1">We'll be in touch if we find new savings for your stack.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}