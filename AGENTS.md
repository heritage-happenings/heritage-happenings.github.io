# Heritage Happenings — AI Agent Instructions

## What This Repo Is

A GitHub Pages site for Heritage on the Marina (San Francisco senior community). Publishes a newsletter, blog posts, dining schedules, and community documents. Content is primarily Markdown files rendered via TooToo LT (the `index.html` at repo root).

- Live: <https://heritage-happenings.github.io/>
- Source: <https://github.com/heritage-happenings/heritage-happenings.github.io>

## Hard Constraints

- **Vanilla JavaScript only** — no frameworks, no build tools, no Node.js
- **Static hosting** — GitHub Pages only, no backend
- **ES2020+** — `const`/`let`, arrow functions, no `var`, no classes, no `this`

## Key Files

| File/Folder | Purpose |
|---|---|
| [`index.html`](index.html) | TooToo LT browser — do not edit `CONFIG` (it auto-detects from URL) |
| [`HOME.md`](HOME.md) | Default landing content |
| `Blog/` | Blog posts as dated Markdown files |
| `Happenings-Issues/` | Newsletter issues |
| `Dining-Service/` | Dining menus and schedules |

## Content Conventions

- Filenames: `YYYY-MM-DD-slug.md` for dated content
- Keep Markdown simple — headings, bullets, links; avoid raw HTML in `.md` files
- Images go in `Photos/`; reference with relative paths

## `index.html` (TooToo LT)

The root `index.html` is a copy of TooToo LT with an **empty** `CONFIG` (auto-detects repo from GitHub Pages URL). When updating it, pull the latest from [`pushme-pullyou-tootoo/tootoo-2026-lt/index.html`](../pushme-pullyou-tootoo/tootoo-2026-lt/index.html) and clear the CONFIG values back to empty strings.
