# Contributing

Thank you for helping. The library is only useful if every scenario works as written, so the bar is high.

## The rules

1. **Run it before you write it.** Every step must have been run end to end in a demo tenant. Set `validated_on` to that date.
2. **Real work, not hypotheticals.** Name the exact inputs (file type, where it lives, how many). Describe a task someone actually does every week or month.
3. **State the limits you saw.** If Copilot missed documents in a big batch, say so and give the batch size that worked.
4. **Be honest about impact.** Use `evidence: estimated` unless you measured it.
5. **Public sources only.** Every capability claim needs a public link in `source_refs`. No preview, roadmap or NDA information.
6. **No customer anything, and nothing that points to one.** No names, logos, people, tenant URLs or engagement details. Use composites such as "a Tier 1 Indonesian retail bank". A composite must fit **at least three real organisations**. Avoid superlatives ("the largest", "the only"), unique combinations of size, sector and location, and events a reader could date to one company. If in doubt, make it more generic.
7. **Fictional demo data only.** Mark files FICTIONAL. Never imitate OJK, BI, BNM or other regulator letterhead, numbering or logos.
8. **Images** only from the demo tenant, saved in `public/approved/`.
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
