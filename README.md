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

Full-text search only works after `npm run build` (use `npx astro preview`).

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
