# Learn the GitHub Copilot app

A hands‑on, self‑paced walkthrough for getting real experience with the
**[GitHub Copilot app](https://github.com/features/ai/github-app)** — the agent‑driven
desktop app for macOS, Windows, and Linux that
[went GA on June 17, 2026](https://github.blog/changelog/2026-06-17-github-copilot-app-generally-available/).

> The GitHub Copilot app is a desktop home for agent‑driven development. Start sessions from
> an issue, PR, or prompt; run **parallel** agent sessions across repos, each on its own branch
> and worktree; review the diff, validate in the integrated terminal and browser, and open a
> pull request that uses your team's existing checks — all without context‑switching.

Clone this repo, open it in the app, and work through the modules at your own pace. You get a
real, runnable codebase to drive the agent against and a step‑by‑step path from your first quick
chat to shipping a reviewed pull request.

---

## Who this is for

- **You:** a developer comfortable with Git, a terminal, and a typical web stack.
- **Time:** about an hour end to end, or pick individual modules.
- **What you'll be able to do:** install the app, run sessions in the three modes, review and ship
  a PR, run sessions in parallel, and know where the advanced features (canvases, automations,
  MCP/BYOK, sandboxes) live.

## What's in here

| Path | What it is |
| --- | --- |
| [`docs/walkthrough.md`](docs/walkthrough.md) | Start here — the suggested path through the modules |
| [`docs/00-prerequisites.md`](docs/00-prerequisites.md) | Install + sign‑in checklist to do first |
| [`docs/01-quick-chat.md`](docs/01-quick-chat.md) | Module 1 — Quick chats |
| [`docs/02-first-session.md`](docs/02-first-session.md) | Module 2 — Your first agent session (modes) |
| [`docs/03-review-and-pr.md`](docs/03-review-and-pr.md) | Module 3 — Review the diff, verify, open a PR |
| [`docs/04-parallel-sessions.md`](docs/04-parallel-sessions.md) | Module 4 — Parallel sessions & worktrees |
| [`docs/05-modes-and-models.md`](docs/05-modes-and-models.md) | Module 5 — Modes, models & reasoning effort |
| [`docs/06-advanced.md`](docs/06-advanced.md) | Module 6 — Canvases, automations, MCP/BYOK, sandboxes, `/chronicle` |
| [`docs/cheatsheet.md`](docs/cheatsheet.md) | One‑page reference to keep open while you work |
| [`exercises/`](exercises/) | Ready‑made tasks + seed issues + solutions |
| [`sample-app/`](sample-app/) | A tiny Express + TypeScript Task API to drive the agent against |

## The sample app

[`sample-app/`](sample-app/) is a tiny **Express + TypeScript Task API** with a passing
[Vitest](https://vitest.dev) + [Supertest](https://github.com/ladjs/supertest) suite. It is
deliberately small and has a few **intentional gaps** so the agent has real work to do as you
follow along:

1. `POST /tasks` has **no input validation**.
2. ~~There is **no `DELETE /tasks/:id`** endpoint (and `TaskStore.remove()` is missing).~~ Done — see issue #2.
3. `setCompleted` has a **subtle bug** — it never refreshes `updatedAt`.
4. `GET /tasks` has **no `?completed=` filter**.

Each gap maps to an exercise in [`exercises/`](exercises/) and a seed issue you can create with
one command. `main` ships green so CI is happy out of the box.

```bash
cd sample-app
npm install
npm test      # 8 passing tests
npm run dev   # http://localhost:3000  (GET /health, /tasks)
```

## How to follow along

1. **Set up first:** work through [`docs/00-prerequisites.md`](docs/00-prerequisites.md) so the app
   is installed, signed in, and this repo is connected.
2. **Fork or clone this repo** so you have your own issues and PRs to work with. Optionally
   create the practice issues in one shot — see [`exercises/seed-issues.md`](exercises/seed-issues.md).
3. **Work through** [`docs/walkthrough.md`](docs/walkthrough.md) module by module.
4. **Keep** [`docs/cheatsheet.md`](docs/cheatsheet.md) open as a quick reference while you work.

## License & contributing

MIT — see [`LICENSE`](LICENSE). Contributions welcome; see
[`CONTRIBUTING.md`](CONTRIBUTING.md) and our [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

> This is a community learning resource and is not an official GitHub product. Product behavior
> and UI evolve quickly — always cross‑check against the
> [official docs](https://docs.github.com/copilot/how-tos/github-copilot-app/getting-started).
