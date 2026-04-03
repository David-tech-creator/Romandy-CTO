---
coverImage: "/conversations4.gif"
title: "Leading Distributed Teams Without Losing the Plot"
excerpt: "Hybrid isn't the hard part. The hard part is maintaining technical decision quality when context is fragmented across time zones, Slack threads, and half-empty meeting rooms."
date: "2026-04-03"
category: "Talent & Teams"
---

## The real problem isn't where people sit

Every CTO I talk to in Romandy has some version of the same setup: a core team in Geneva or Lausanne, a few engineers in Berlin or Lisbon, maybe a squad in a nearshore partner's office. Everyone calls it "hybrid." Nobody agrees on what that means.

Here's what I've learned: the location model is not your problem. Your problem is decision latency. When an architect in Geneva makes a call at 16:00 and the senior engineer in Porto finds out the next morning through a Slack message with no context — that's where things break. Not because people are remote. Because information moved poorly.

## Decision-making needs a protocol, not a policy

In colocated teams, decisions happen in hallways. You overhear things. You correct course in real time. Distributed teams don't have that ambient awareness, and no amount of Slack channels recreates it.

What works is being explicit about how decisions get made and documented. Not in a heavy governance way. In a "we write things down" way.

One team I advise adopted a dead-simple format: any technical decision that affects more than one team gets a one-page writeup in a shared repo. Title, context, options considered, decision, who made it, date. They call them Decision Records. Nothing original — it's a lightweight ADR practice. But the effect was immediate. Engineers stopped relitigating choices. Onboarding got faster. The CTO stopped being a bottleneck because the reasoning was visible.

### Make the implicit explicit

If your Geneva office has a whiteboard session and reaches a conclusion, that conclusion doesn't exist for the distributed team until someone writes it down and posts it where people actually look. This sounds obvious. Almost nobody does it consistently.

Assign a "decision scribe" in every meeting where remote participants are absent. Rotate the role. Make it a habit, not a heroic effort.

## Async-first is a leadership stance, not a tooling choice

Saying "we're async-first" and then scheduling six hours of video calls a day is just lying with extra steps.

Async-first means you design work so that the default communication path is written and asynchronous. Meetings become the exception — reserved for debate, alignment, and the things text genuinely can't carry (like reading the room when there's tension on the team).

This requires CTOs to change their own behavior first. If you respond to every Slack message in real time, you're training your team to expect synchronous communication. If you demand video calls to "stay aligned," you're telling people their written communication isn't trusted.

I shifted my own pattern two years ago: no meetings before 11:00, all status updates via written check-ins, live calls only for architecture reviews and 1:1s. My team's throughput didn't change. Their stress levels dropped measurably.

## The office isn't dead — but its purpose changed

I'm not anti-office. Geneva is a great city to work in, and there's real value in being together. But the value is no longer "this is where work happens." The value is relationship density.

Use office days for the things that are genuinely better in person: onboarding new engineers, running retrospectives, whiteboard sessions for early-stage design, team dinners. Stop using office days for status meetings that could be a Loom video.

### Watch out for two-tier culture

The most insidious failure mode in hybrid is when office-present engineers get faster access to context, decisions, and promotions. If your promotion pipeline or architecture influence skews toward whoever is physically near leadership, your distributed people will leave. And they'll be right to.

Audit this. Look at who gets pulled into design discussions. Look at who gets credit in reviews. If there's a proximity bias, fix it before it costs you your best remote engineers.

## Code review is your secret alignment tool

In distributed teams, pull requests are the most honest communication channel you have. They're timestamped, written, contextual, and tied to real work. Invest in your code review culture. Expect thorough reviews. Use them as a coaching surface. A good PR review thread teaches more than most architecture meetings.

## The takeaway

Technical leadership in distributed teams isn't about tools or policies. It's about reducing the time between a decision being made and everyone understanding why. Write things down, default to async, and ruthlessly audit whether your in-office habits are creating invisible disadvantages for remote engineers. The teams that get this right ship faster — not despite being distributed, but because the discipline makes them sharper.