# Copilot, Cowork & Scout scenario library: Indonesia and Malaysia

Step by step scenarios showing how to use Microsoft 365 Copilot, Copilot Cowork and Microsoft Scout for real work in regulated industries. Each scenario lists the exact inputs, data controls, known limits and how to check the output, with prompts in English, Bahasa Indonesia and Bahasa Melayu.

> Community project. Not official Microsoft guidance. See [DISCLAIMER.md](DISCLAIMER.md).

## Run locally

```bash
npm ci
npm run dev        # http://localhost:4321/copilot-scenarios-asean/
npm run build      # schema check, render, Pagefind index -> dist/
npm run check      # sections, images, banned terms
```

The site publishes only scenarios with `status: validated`, and never shows the status itself. Draft and partly validated scenarios stay in the repo for the maintainer. To preview everything locally: `PUBLISH_ALL=1 npm run dev` (PowerShell: `$env:PUBLISH_ALL='1'; npm run dev`).

Full-text search only works after `npm run build` (use `npx astro preview`).

## Discovery experience

The homepage offers a three-question persona finder or direct browsing (`?view=all`). The finder ranks existing scenario tags by department, broad role, then familiar tools; it does not infer licences or hide scenarios just because a tool differs. Explicit browse filters still narrow the results. Answers, filters and searches are encoded in the URL for refresh, back navigation and sharing; no account or recommendation service is needed.

UI-only matching and URL logic lives in `src/lib/discovery.mjs`, with broad role mappings in `ROLES`. New scenarios use the existing taxonomy and become discoverable when published and rebuilt; no scenario schema changes are required. Run the focused checks with `node --test tests/discovery.test.mjs`.

The appearance switch offers Light (the default) and Dark, and saves the visitor's choice locally. Light uses a darker Microsoft blue accent; Dark uses a brighter blue with slate surfaces. Both keep readable text and distinct borders without pure white or black surfaces. Tool labels include locally hosted [Microsoft Fluent System Icons](https://github.com/microsoft/fluentui-system-icons), used as functional symbols rather than product logos. The original MIT notice is in `public/approved/icons/LICENSE.txt`; mappings live in `src/lib/tool-icons.mjs`.

## Layout

| Path | What |
|---|---|
| `content/scenarios/` | One Markdown file per scenario |
| `taxonomy/taxonomy.yml` | Every allowed tag. The build fails on anything else |
| `templates/scenario-template.md` | Copy this to start a scenario |
| `public/approved/` | The only place images may live |
| `public/kits/` | Fictional demo files, one zip per scenario |
| `scripts/` | CI checks and the strict build wrapper |

## Repository setup (once)

1. Settings → Pages → Source: **GitHub Actions**
2. Settings → Secrets → Actions → add `BANNED_TERMS`: customer and project names, one per line
3. Settings → Branches → protect `main`: require the **CI** check and a CODEOWNERS review

## Licences

Code: [MIT](LICENSE). Scenario content: [CC BY 4.0](LICENSE-CONTENT).
