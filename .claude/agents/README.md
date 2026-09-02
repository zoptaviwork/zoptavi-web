# Agents & tooling for this repo

## Subagents (added here)

Nine specialist agent personalities, curated for a design-led web build, copied from
[`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) (MIT — see
`LICENSE-agency-agents`). Plain markdown + YAML frontmatter, no code execution.

| File | Use it for |
|------|-----------|
| `design-ui-designer.md` | Visual design systems, component libraries, pixel-level polish |
| `design-ux-researcher.md` | Usability review, user-flow critique, research synthesis |
| `design-brand-guardian.md` | Brand consistency, identity system, voice & tone |
| `design-visual-storyteller.md` | Landing-page narrative, hero concepts, visual hierarchy |
| `design-ui-finish-gate-reviewer.md` | Catches generic / templated UI before it ships |
| `engineering-frontend-developer.md` | React / Vite implementation, performance, a11y |
| `engineering-rapid-prototyper.md` | Fast POC / new-page scaffolding |
| `engineering-code-reviewer.md` | Correctness / security / maintainability review |
| `engineering-technical-writer.md` | READMEs, component docs, API references |

Invoke in a Claude Code session by name, e.g. *"Use the UI Finish-Gate Reviewer to check the Services page"*.
The full 230-agent roster (game dev, finance, healthcare, …) is in the source repo — copy any others you want
into this folder.

## Code-intelligence tools (NOT installed — install yourself)

Both need a Claude Code restart to take effect and run install scripts from the network, so they weren't set
up automatically. Review each script before running it.

### Graft — codebase context graph
[`trailhq/Graft`](https://github.com/trailhq/Graft) · npm `@nanonets/graft`. Builds a semantic markdown graph
of the repo and wires 6 MCP tools into Claude Code (`graft_find_code`, `graft_trace_calls`, …).

```bash
npm install -g @nanonets/graft
cd "C:\Users\lenovo\OneDrive\Desktop\Zoptavi E-commerce"
graft init
```

The graph lives in `graft/` (add to `.gitignore`); teammates run `graft build`. Structural graph is free;
LLM summaries use your own API key.

### codebase-memory-mcp — local code knowledge graph
[`DeusData/codebase-memory-mcp`](https://github.com/DeusData/codebase-memory-mcp). Tree-sitter index, 15 MCP
tools, fully local, no API key.

```powershell
# review this script first
Invoke-WebRequest -Uri https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.ps1 -OutFile install.ps1
Get-Content .\install.ps1     # <- read it
Unblock-File .\install.ps1
.\install.ps1
```

Then restart Claude Code and say "Index this project". Indexes cache to `~/.cache/codebase-memory-mcp/`.
