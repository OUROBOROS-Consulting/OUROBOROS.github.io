---
layout: default
title: AI Risk Assessment Checklist
permalink: /ai-risk-checklist/
category: Resources
description: A generic AI risk assessment checklist covering data privacy, bias, reputation, and operational risk.
---

# AI Risk Assessment Checklist

Use this checklist to identify where AI systems in your organization create exposure. It is not legal advice. Each item should be answered with evidence or a decision.

## 1. Data Privacy & Confidentiality

- [ ] Does any AI system receive PII, health records, or financial data?
- [ ] Are API calls sent outside your network (cloud provider, vendor endpoint)?
- [ ] Is there encryption in transit and at rest?
- [ ] Can the AI provider retain logs or use data for model training?
- [ ] Is there a documented data retention and deletion policy?
- [ ] Have you reviewed the vendor's privacy policy for AI-specific clauses?
- [ ] Is there a breach notification process in place?

## 2. Bias & Discrimination

- [ ] Who defined the training data and why?
- [ ] Has the model been tested on your actual population, not just benchmarks?
- [ ] Are there documented false positives/negatives by demographic group?
- [ ] Is there an appeal or override process for affected users?
- [ ] Have you reviewed the model card or technical report?
- [ ] Is there human review for high-stakes decisions?

## 3. Reputation & Liability

- [ ] Can AI outputs be traced back to your organization?
- [ ] Is there a review process before public release?
- [ ] Have you assessed deepfake or impersonation risk?
- [ ] Do you have insurance coverage for AI-related errors?
- [ ] Can you explain AI decisions when asked by regulators?
- [ ] Is there a takedown or correction process?

## 4. Operational & Security Risk

- [ ] Are there rate limits or usage caps?
- [ ] Can the vendor change pricing or discontinue service?
- [ ] Is there a backup plan if the service goes down?
- [ ] Have you tested failover or offline alternatives?
- [ ] Are there single points of failure in the workflow?
- [ ] Is there logging and monitoring for AI usage?

## 5. Regulatory Compliance

- [ ] Which laws apply (GDPR, CCPA, state AI bills, sector-specific rules)?
- [ ] Have you completed a data protection impact assessment?
- [ ] Is there a record of processing activities?
- [ ] Have you notified relevant authorities if required?
- [ ] Do you have a designated privacy officer or data steward?
- [ ] Is there a mechanism for data subject requests?

## 6. Internal Controls

- [ ] Who owns the AI system and is accountable for outcomes?
- [ ] Is there a governance committee or review board?
- [ ] Are there documented policies for AI use?
- [ ] Do engineers and analysts receive privacy training?
- [ ] Is there an incident response plan for AI failures?
- [ ] Are there regular audits of AI usage and outcomes?

---

## How to Use This Checklist

1. **Assign ownership.** Each item should have a person responsible for answering.
2. **Gather evidence.** Screenshots, logs, vendor contracts, policy documents.
3. **Score each item.** Mark as: Resolved, Needs Work, or Open.
4. **Prioritize.** Focus on items with high risk and low maturity.
5. **Plan remediation.** Assign tasks, timelines, and owners.
6. **Schedule follow-up.** Reassess quarterly or after major changes.

---

## Next Steps

This checklist identifies gaps. Closing them requires work. Contact ouroborOS for:

- A private AI readiness assessment ($5,000–$25,000 fixed fee)
- Hourly consulting at $150–$350/hr
- Governance framework implementation

[Get a free 20-minute AI privacy call](/intake/)

---

*This checklist is a starting point. For your specific situation, ouroborOS can provide a tailored risk assessment.*
