---
coverImage: "/agentic9.png"
title: "Agentic AI: What CTOs Must Evaluate Now"
excerpt: "Agentic AI systems are moving from demos to production. Here's what actually matters when you're the one signing off on putting autonomous agents into your enterprise stack."
date: "2026-03-30"
category: "AI & Automation"
---

## The shift is architectural, not incremental

Let's be precise about what changed. LLM-based chatbots take a prompt and return text. Agentic AI systems take a goal, decompose it into tasks, use tools, make decisions in loops, and act on external systems — sometimes without a human in the middle.

That's not a better chatbot. That's a different architecture with different failure modes. And most enterprise evaluation frameworks haven't caught up.

If you're a CTO in Romandy running regulated workloads — finance, pharma, commodities trading — you don't get to learn this the hard way.

## What "agentic" actually means in practice

Strip away the marketing. An agentic system has four properties:

1. **Goal decomposition** — it breaks a high-level objective into subtasks
2. **Tool use** — it calls APIs, queries databases, writes files
3. **Autonomy loops** — it evaluates its own output and retries or pivots
4. **State persistence** — it remembers context across steps

When Klarna replaced hundreds of customer service agents with an AI system in 2024, they were running a constrained version of this. The agent could look up orders, process refunds, and escalate — in a loop, with memory. That was a single-domain, heavily guardrailed deployment. Now imagine that pattern applied to procurement workflows, compliance checks, or infrastructure management.

That's where this is going. The question is whether your stack and your org are ready.

## Five things to evaluate right now

### 1. Control boundaries

Every agent needs a blast radius. What systems can it touch? What actions are reversible? What requires human approval?

If you can't answer these questions per-agent and per-environment, you're not ready to deploy. Build the permission model before you build the agent.

### 2. Observability

Traditional logging won't cut it. You need to trace multi-step reasoning chains, tool invocations, retry loops, and the decisions the agent made at each branch point. When something goes wrong at step 14 of a 20-step workflow, "the AI hallucinated" is not a post-mortem.

Invest in agent-specific observability. Tools like LangSmith, Arize, or custom OpenTelemetry instrumentation for agent traces are no longer optional — they're table stakes.

### 3. Cost modeling

Agentic systems are token-hungry. A single agent run that reasons through ten steps, calls four tools, and self-corrects twice can burn 50–100x the tokens of a simple prompt-response. One team I spoke with at a Geneva fintech saw their OpenAI bill jump 8x in a month after deploying an autonomous research agent internally — with only 40 users.

Model your costs per-agent-run, not per-API-call. Set budget caps. Monitor aggressively.

### 4. Failure modes unique to agents

Agents fail differently than traditional software. They can get stuck in loops. They can confidently take the wrong action across multiple systems before anyone notices. They can "satisfy" a goal in a technically correct but operationally catastrophic way.

You need circuit breakers, timeout policies, and human-in-the-loop checkpoints for high-stakes actions. Treat agent deployments like you'd treat a new junior engineer with production access: trust, but verify constantly.

### 5. Data governance and Swiss regulatory context

Under FADP and emerging EU AI Act spillover, you need to know what data flows through agent reasoning chains. If an agent queries your customer database, reasons over it, and then calls an external API — where did that data go? Was it logged in a third-party trace? Is it sitting in a context window on a US-hosted model?

For Swiss enterprises, this isn't theoretical. Map every data flow through the agent's execution path. Your DPO should be in the room when you design these systems, not after.

## Don't confuse demos with deployability

The demo-to-production gap for agentic AI is wider than anything we've seen since microservices. A demo can ignore auth, cost, observability, failure handling, and data governance. Production cannot.

The CTOs who'll get value from this wave are the ones treating agentic AI as a systems engineering problem — not an AI problem. That means architecture reviews, threat modeling, cost forecasting, and incremental rollout with real kill switches.

**The takeaway:** Agentic AI is real and it's production-ready for narrow, well-bounded use cases today. But deploying it responsibly requires new evaluation criteria that most enterprise frameworks don't yet include. Start with control boundaries, observability, and cost modeling. Get those right before you get ambitious.