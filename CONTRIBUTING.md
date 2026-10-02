# Contributing

Thank you for helping. The library is only useful if every scenario works as written, so the bar is high.

## The rules

1. **Run it before you call it validated.** New scenarios can be published as `status: draft`, clearly labelled on the site. Only set `partly-validated` or `validated`, with `validated_on`, after running the steps end to end in a demo tenant.
2. **Real work, not hypotheticals.** Name the exact inputs (file type, where it lives, how many). Describe a task someone actually does every week or month.
3. **State the limits you saw.** If Copilot missed documents in a big batch, say so and give the batch size that worked.
4. **Be honest about impact.** Use `evidence: estimated` unless you measured it.
5. **Public sources only.** Every capability claim needs a public link in `source_refs`. No preview, roadmap or NDA information.
6. **No customer anything, and nothing that points to one.** No names, logos, people, tenant URLs or engagement details. Use composites such as "a Tier 1 Indonesian retail bank". A composite must fit **at least three real organisations**. Avoid superlatives ("the largest", "the only"), unique combinations of size, sector and location, and events a reader could date to one company. If in doubt, make it more generic.
7. **Fictional demo data only.** Mark files FICTIONAL. Never imitate OJK, BI, BNM or other regulator letterhead, numbering or logos.
8. **Images** only from the demo tenant or official product-brand assets, saved in `public/approved/`. Brand assets need a source and usage note, must identify the correct product, and must not be used as the library's logo.
9. **Three languages.** Every `:::prompt` has EN, ID and BM lines, reviewed by native speakers.

## Workflow

1. Copy `templates/scenario-template.md` to `content/scenarios/<id>.md`.
2. Need a new tag? Add it to `taxonomy/taxonomy.yml` in the same pull request.
3. `npm run check && npm run build` must pass locally.
4. Open a pull request and complete the checklist.

## Difficulty is about the user, not the product

| Level | The user can… |
|---|---|
| L1 Starter | Write one prompt against one source and skim the output |
| L2 Practitioner | Iterate over several turns with their own files, or run a ready-made Scout automation or Cowork task |
| L3 Power user | Chain apps, batch inputs, verify systematically, write their own Scout automation |
| L4 Builder | Publish an agent with grounding and instructions for other people |

## Routines in tiers

For a routine that people do with different licences (email triage, meeting follow-up, weekly report), write one page with a tier for each way of doing it. Add `tiers` to the frontmatter, in the order used in `taxonomy.yml`:

```yaml
difficulty: 1          # the entry tier's level
licence: [copilot-chat, m365-copilot, cowork, scout]   # every tier's licence
surface: [outlook, copilot-chat, cowork, scout, teams] # every tier's surfaces
tiers:
  - { key: basic, licence: copilot-chat, difficulty: 1, surface: [outlook], runs: "You run one prompt each morning", effort: "About 15 minutes" }
  - { key: premium, licence: m365-copilot, difficulty: 2, surface: [copilot-chat], runs: "Scheduled prompt at 07:30", effort: "About 10 minutes" }
```

Then, inside `## Steps`, one block per tier in the same order. Tier blocks use four colons so they can contain prompts:

```
::::tier{key="basic"}
**1. Open Copilot in Outlook.** ...

:::prompt
EN: ...
ID: ...
BM: ...
:::
::::
```

The site builds large workflow buttons from the frontmatter. The first workflow is selected by default. Only its steps, requirements and supporting sections are visible. Optional `title` and `needs` fields give each workflow a short button label and accurate prerequisites.

Under `## Check it` and `## When it goes wrong`, add matching blocks with `section="checks"` and `section="fixes"`:

```
::::tier{key="basic" section="checks"}
- **Coverage:** compare the reviewed messages with the same date range in Outlook.
::::
```

Use a fixes block the same way under When it goes wrong. Step numbers restart per workflow; the renderer namespaces anchors and completion state. If either supporting section uses workflow blocks, provide one for every workflow in frontmatter order. The checks fail if a Steps block is missing, out of order or without a prompt.

For workflows using the customer's existing mailbox or other live work data, set `demo_kit: false`. No download or folder tree is shown, and the input section is labelled Your inputs. Keep fictional validation fixtures in the repository if useful; they are not customer prerequisites.
