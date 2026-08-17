---
layout: article
title: LLM Disclosure
category: About
hero_svg: /assets/images/logo.svg
permalink: /llm-disclosure/
back_url: /about/
lede: >
  This page is written for someone who has good reason to be careful.
  Every claim here is verifiable. Open your browser's network tab and check.
tags:
  - Where your material goes
  - What local means
  - Where Claude helps
  - Enforced in code
  - Not built yet
  - What you can require
---

## Two different promises

The [privacy policy](/privacy/) covers this website. It makes one narrow claim: reading these pages sends no request anywhere but this site.

This page covers something else. It covers what happens to your material after you hand it to me.

Do not read the first promise as the second one. They are unrelated, and the second one is the one that matters if you are deciding whether to trust me with a case file.

## Where your material goes

I use two kinds of language model. One runs on my desk. One runs on a company's servers. The difference between them is the whole architecture, so I sort every piece of material before it goes anywhere.

| Material | Where it is processed |
|---|---|
| Anything sensitive: your documents, your correspondence, names, dates, case detail | The local model on my machine. Nothing leaves. |
| My own work: this website, my research notes, my writing, my code | Anthropic's Claude, on Anthropic's servers |
| Records stripped of names and identifying detail, where I need depth the local model cannot reach | Claude, and only after I have removed the detail by hand |

That third row is a real thing I have done, not a hypothetical. I am naming it because a disclosure page that admits nothing is worth nothing.

What has never happened, and what I am committing to in writing: **sensitive client material is seen only by the model on my machine.** Not summarized to an external model. Not pasted into one to ask a question about it. Not attached for a second opinion.

## What local actually means {#what-local-means}

Local is a word that gets used loosely. Here is the specific arrangement, so you can check it against anything you know about how these systems work.

The local model runs under Ollama, bound to `127.0.0.1` on port `11434`. That address is the loopback interface. It is not a server on my network and it is not reachable from outside this machine. Three models are resident: a general-purpose model for daily work, a larger mixture-of-experts model for anything harder, and a small embedding model.

That last one matters more than it sounds. Search over my own notes and memory is computed by the embedding model locally, which means the index of what I know is never uploaded to build a search feature. Most tools that offer semantic search over your documents do exactly that.

Inference on the local model costs nothing per token and produces no network traffic. Those two facts are connected, and they are why the arrangement holds up under pressure. There is no metered API bill creating a quiet incentive to send the work somewhere cheaper.

## Where Claude helps, and where it does not {#where-claude-helps}

Anthropic's Claude is a genuine part of how this practice runs. Pretending otherwise while selling AI services would be absurd. It has touched nearly every part of production on this site except the design.

What it does: takes my notes and structures them into something publishable. Holds a long argument together across a document longer than I can hold in my head at once. Finds the places where my own writing drifts from what I actually mean.

What it does not do: originate the argument, choose what this firm believes, or ship anything unread. Every citation on this site points to source material I have read. The voice is mine, and the guardrails against linguistic and semantic drift are there because a model left alone will smooth writing toward the average of everything it has seen. I check for that specifically.

The judgment is mine. So is the responsibility when it is wrong.

## What is enforced in code, not promised in prose {#enforced-in-code}

A rule written in a document is a suggestion to a language model. A tool that does not exist cannot be misused.

Wherever I could remove a capability instead of restricting it, I removed it.

- **The local assistant has no ability to send mail.** Not a policy forbidding it: there is no outbound mail transport configured at all. It can write a draft into my own mailbox for me to read. The send command fails because the machinery is absent.
- **Every message is classified before it is touched**, into legal, firm, client, or personal. Anything that matches no rule is classified as legal, which is the most restrictive tier. It fails toward caution, not toward convenience.
- **Material in the most restrictive tier cannot be quoted outward.** Not into a hosted model, not into a chat, not into anything published.
- **A never-contact list is enforced at the point of action**, and it is enforced by checking what would actually be delivered against what was screened, rather than by banning suspicious-looking characters. I tried it the other way first. Four separate holes got through before I replaced the approach.
- **Every action is written to an append-only log.** Not a log I can quietly tidy.
- **Credentials live in the operating system keychain** and are never typed into a conversation with a hosted model. The password protecting a mailbox of legal correspondence would be a strange thing to hand to a service running somewhere else.
- **The local system listens only on loopback.** Nothing on my network can reach it. Remote access, when I need it, terminates on an encrypted private link.

None of that is impressive engineering. It is ordinary engineering applied to a threat model most people building with these tools have not bothered to write down.

## What is not built yet {#not-built-yet}

Three things are designed and not finished. You should know which is which.

**Document ingestion is not built.** The local model does not yet read a case file and answer questions about it. It handles correspondence and my own notes. Sensitive documents I read myself. This is the honest limit of the current setup and it is why the tier table above says "seen only by the model on my machine" rather than describing a pipeline.

**Automatic redaction is not built.** When I strip identifying detail before sending something to a hosted model, I do it by hand and I read it twice. An automated redaction step is on the list precisely because one missed name is the whole failure.

**The escalation gate is manual.** The design calls for a tool that physically blocks sensitive material from reaching a hosted model without a per-item approval. That tool is not written yet. Today the boundary is enforced by me deciding, every time. That is slower and more fragile than code, and I would rather say so than let you assume a machine is watching.

## What you can require of me {#what-you-can-require}

You do not have to accept the defaults.

**Local only.** Say so and nothing you give me touches a hosted model at any stage. This is available today and it costs you nothing.

**No model at all.** Some work does not need one. Say so and I will do it the long way.

**Tell me your line.** If there is a category of detail that must never be processed by any model, name it at intake and it becomes a constraint on the engagement rather than a preference I try to remember.

I would rather you ask an uncomfortable question now than discover an assumption later. If something on this page is unclear or you want to see the setup, [ask me](/intake). I will show you.

---

*Last reviewed 17 August 2026. This page describes the setup as it actually stands on that date, including the parts that are unfinished. When the unfinished parts ship, this page changes before the service does.*
