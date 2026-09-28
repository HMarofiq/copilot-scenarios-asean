---
id: bfsi-short-name-000          # prefix: bfsi | gov | enr | x (cross-industry); must match the file name
title: { en: "", id: "", ms: "" }
summary:                         # one sentence, max 200 characters, shown on the card
  en: ""
  id: ""
  ms: ""
industry: []                     # values: taxonomy/taxonomy.yml
department: []
persona: []
market: [ID, MY]
difficulty: 1                    # USER SKILL only: 1 Starter, 2 Practitioner, 3 Power user, 4 Builder
surface: []                      # where the user works: copilot-chat, word, excel, teams, agent, cowork, scout...
licence: []                      # what they need to own
inputs:                          # the exact files: be specific enough to reproduce
  - { name: "", format: "", where: "", count: "" }
data:
  sensitivity: Confidential      # Public | Internal | Confidential | Highly Confidential
  customer_pii: false
  signoff: ""                    # the role that approves the output before use
impact:
  baseline: ""
  target: ""
  evidence: estimated            # estimated | observed-in-pilot | customer-measured. Be honest.
card:
  problem: ""                    # one sentence, the pain in the user's words
  output: ""                     # the artifact they walk away with
limits:                          # limits you OBSERVED while running it
  - ""
source_refs:                     # public learn.microsoft.com (or similar) links backing every capability claim
  - "https://learn.microsoft.com/"
status: draft                    # draft | partly-validated | validated
# validated_on: 2026-01-01       # required once status is not draft: the day you last ran every step
# validation_note: ""            # required for partly-validated: which steps were not exercised
---

## Situation

Who does this, how often, what they produce, and how they do it today. Two or three sentences. No customer names.

<!-- Inputs, Data and controls, and Know the limits are generated from the frontmatter here. -->

## Steps

**1. Step name.** What to open and where.

:::prompt
EN: The prompt in English.
ID: Prompt dalam Bahasa Indonesia.
BM: Prompt dalam Bahasa Melayu.
:::

**2. Next step.**

## Check it

- How the user verifies the output before relying on it.

## When it goes wrong

- **Symptom.** Cause and fix.

## Take it further

- **L3 Scout:** the next rung, tagged with level and licence.

:::presenter
**Ask before you start:** three discovery questions.

**20-minute flow:** timings per step.

**Questions you'll get:** answered with public doc links.

**Demo kit:** what's in `public/kits/<id>.zip`.
:::
