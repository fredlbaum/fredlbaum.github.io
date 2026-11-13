# k0flb.com

The official website and transmission relay for **K0FLB** (Fred L. Baum), featuring a retro-futuristic interactive menu interface inspired by the 2005 promotional system for *The Hitchhiker's Guide to the Galaxy*.

---

## Architecture & Tech Stack

* **Static Site Engine**: [Eleventy 3](https://www.11ty.dev/) (pure ESM).
* **Styling**: Dart Sass with `@use` modules and fine-grained dependency tracking.
* **Hosting**: GitHub Pages via automated GitHub Actions (`.github/workflows/deploy.yml`).
* **Interactive Interface**: Vanilla CSS & JavaScript interactive rainbow pill menu with horizontal extensions (Behavior A) and cascading vertical pop-up stacks (Behavior B).
* **Zero-Tooling Content Pipeline**: Content contributors can publish directly from GitHub by adding markdown files to `_posts/` (blog), `_projects/` (projects), or `_gear/` (station gear). See `usage.md`.

---

## Local Development (Docker)

If you do not have Node.js installed locally, run with Docker:

```bash
docker-compose up
```

Then open [http://localhost:4000](http://localhost:4000) in your browser.

---

## Local Development (Node.js)

If you have Node 22+ installed:

```bash
npm install
npm start
```

Runs Eleventy with live reload on [http://localhost:8080](http://localhost:8080).

To build the static distribution:

```bash
npm run build
```

---

## Customizing Menu Entries

The menu is completely data-driven:
* Edit `_data/menu.json` to swap out the stand-in Hitchhiker's Guide entries for your own sections (Amateur Radio, Projects, Rig Logs, etc.).
* Edit `_data/site.js` to change global metadata.
