"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TOOLS = [
  {
    id: "cursor",
    name: "Cursor",
    plans: [
      { id: "hobby", name: "Hobby", price: 0 },
      { id: "pro", name: "Pro", price: 20 },
      { id: "business", name: "Business", price: 40 },
      { id: "enterprise", name: "Enterprise", price: 100 },
    ],
  },
  {
    id: "github_copilot",
    name: "GitHub Copilot",
    plans: [
      { id: "individual", name: "Individual", price: 10 },
      { id: "business", name: "Business", price: 19 },
      { id: "enterprise", name: "Enterprise", price: 39 },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "pro", name: "Pro", price: 20 },
      { id: "max", name: "Max", price: 100 },
      { id: "team", name: "Team", price: 30 },
      { id: "enterprise", name: "Enterprise", price: 60 },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "plus", name: "Plus", price: 20 },
      { id: "team", name: "Team", price: 30 },
      { id: "enterprise", name: "Enterprise", price: 60 },
    ],
  },
  {
    id: "anthropic_api",
    name: "Anthropic API",
    plans: [{ id: "pay_as_you_go", name: "Pay as you go", price: 0 }],
  },
  {
    id: "openai_api",
    name: "OpenAI API",
    plans: [{ id: "pay_as_you_go", name: "Pay as you go", price: 0 }],
  },
  {
    id: "gemini",
    name: "Gemini",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "pro", name: "Pro", price: 20 },
      { id: "ultra", name: "Ultra", price: 30 },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "pro", name: "Pro", price: 15 },
      { id: "team", name: "Team", price: 35 },
    ],
  },
];

const USE_CASES = ["coding", "writing", "data", "research", "mixed"];

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

const DEFAULT_FORM: FormState = {
  tools: [],
  teamSize: 1,
  useCase: "mixed",
};

export default function AuditPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("spendlens_form");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(parsed.form || DEFAULT_FORM);
      setSelectedTools(parsed.selectedTools || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("spendlens_form", JSON.stringify({ form, selectedTools }));
  }, [form, selectedTools]);

  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter((t) => t !== toolId));
      setForm((f) => ({ ...f, tools: f.tools.filter((t) => t.toolId !== toolId) }));
    } else {
      setSelectedTools([...selectedTools, toolId]);
      const tool = TOOLS.find((t) => t.id === toolId)!;
      setForm((f) => ({
        ...f,
        tools: [...f.tools, { toolId, planId: tool.plans[0].id, seats: 1, monthlySpend: tool.plans[0].price }],
      }));
    }
  };

  const updateToolEntry = (toolId: string, field: keyof ToolEntry, value: string | number) => {
    setForm((f) => ({
      ...f,
      tools: f.tools.map((t) => {
        if (t.toolId !== toolId) return t;
        if (field === "planId") {
          const tool = TOOLS.find((tool) => tool.id === toolId)!;
          const plan = tool.plans.find((p) => p.id === value)!;
          return { ...t, planId: value as string, monthlySpend: plan.price * t.seats };
        }
        if (field === "seats") {
          const tool = TOOLS.find((tool) => tool.id === toolId)!;
          const plan = tool.plans.find((p) => p.id === t.planId)!;
          return { ...t, seats: Number(value), monthlySpend: plan.price * Number(value) };
        }
        return { ...t, [field]: value };
      }),
    }));
  };

  const handleSubmit = () => {
    if (selectedTools.length === 0) return;
    localStorage.setItem("spendlens_audit_input", JSON.stringify(form));
    router.push("/results");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="text-xl font-bold text-emerald-400">SpendLens</a>
        <span className="text-white/40 text-sm">Free AI Spend Audit</span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Audit your AI spend</h1>
        <p className="text-white/50 mb-10">Select the tools you pay for and fill in your plan details.</p>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
          <h2 className="font-semibold mb-4">About your team</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/50 mb-1 block">Team size</label>
              <input
                type="number"
                min={1}
                value={form.teamSize}
                onChange={(e) => setForm((f) => ({ ...f, teamSize: Number(e.target.value) }))}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-sm text-white/50 mb-1 block">Primary use case</label>
              <select
                value={form.useCase}
                onChange={(e) => setForm((f) => ({ ...f, useCase: e.target.value }))}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                {USE_CASES.map((uc) => (
                  <option key={uc} value={uc} className="bg-black">
                    {uc.charAt(0).toUpperCase() + uc.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h2 className="font-semibold mb-4">Select your AI tools</h2>
        <div className="flex flex-wrap gap-2 mb-8">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => toggleTool(tool.id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                selectedTools.includes(tool.id)
                  ? "bg-emerald-500 border-emerald-500 text-black"
                  : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>

        {selectedTools.length > 0 && (
          <div className="space-y-4 mb-10">
            <h2 className="font-semibold">Plan details</h2>
            {selectedTools.map((toolId) => {
              const tool = TOOLS.find((t) => t.id === toolId)!;
              const entry = form.tools.find((t) => t.toolId === toolId)!;
              if (!entry) return null;
              return (
                <div key={toolId} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">{tool.name}</span>
                    <button onClick={() => toggleTool(toolId)} className="text-white/30 hover:text-white/60 text-sm">
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-white/40 mb-1 block">Plan</label>
                      <select
                        value={entry.planId}
                        onChange={(e) => updateToolEntry(toolId, "planId", e.target.value)}
                        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      >
                        {tool.plans.map((plan) => (
                          <option key={plan.id} value={plan.id} className="bg-black">
                            {plan.name} — ${plan.price}/seat
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-1 block">Seats</label>
                      <input
                        type="number"
                        min={1}
                        value={entry.seats}
                        onChange={(e) => updateToolEntry(toolId, "seats", e.target.value)}
                        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/40 mb-1 block">Monthly spend ($)</label>
                      <input
                        type="number"
                        min={0}
                        value={entry.monthlySpend}
                        onChange={(e) => updateToolEntry(toolId, "monthlySpend", e.target.value)}
                        className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={selectedTools.length === 0}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/10 disabled:text-white/30 text-black font-bold py-4 rounded-xl text-lg transition"
        >
          {selectedTools.length === 0 ? "Select at least one tool to continue" : "Run My Audit →"}
        </button>
      </div>
    </main>
  );
}