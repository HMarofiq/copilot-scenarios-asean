---
id: bfsi-short-name-000          # prefix: bfsi | gov | enr | tel | x (cross-industry); must match the file name
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
  - { name: "Title: short detail", format: "", where: "", count: "", kit: ["01_File.docx"], steps: [2] }   # kit and steps optional: shown in the Files list
objective: ""                    # optional: the end goal in 1-2 plain sentences (opens the page; falls back to card.output)
needs: []                        # optional: extra tools beyond licence and apps, e.g. "Word desktop for step 8"
run_time: ""                     # optional: e.g. "Part A about 20 min, Part B about 30 min"
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
  - "Short point first. Then the detail."   # the first sentence renders in bold
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

<!-- "**N. Step name.**" becomes a numbered step card with its own heading.
     "**Part A: name (about N minutes).**" becomes a section heading above the steps it covers.
     A paragraph starting "After you run it:" is styled as that step's check.
     In "When it goes wrong", end a fix with "(step N)" to tag it and link it from that step card. -->

**1. Step name.** What to open and where.

:::prompt
ABOUT: Optional one-line summary of what this prompt produces.
EN: One instruction per line.
Write each rule on its own line so a reader can scan it and edit one value.
A prompt written as a single line still renders as one paragraph.
ID: Satu instruksi per baris.
Tulis setiap aturan pada barisnya sendiri.
Prompt yang ditulis dalam satu baris tetap tampil sebagai satu paragraf.
BM: Satu arahan setiap baris.
Tulis setiap peraturan pada barisnya sendiri.
Prompt yang ditulis dalam satu baris tetap dipaparkan sebagai satu perenggan.
:::

After you run it: how the user checks this step before moving on.

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
