# Authoring & Publishing Guide for k0flb.com

This guide explains how to add and edit articles and menu entries on `k0flb.com` directly through the GitHub web interface.

---

## Adding a New Post / Transmission

1. Navigate to the `_posts/` folder on GitHub.
2. Click **Add file** &rarr; **Create new file**.
3. Name the file using the format: `YYYY-MM-DD-title-slug.md` (e.g. `2026-06-01-field-day-report.md`).
4. Paste the front matter block at the very top:
   ```markdown
   ---
   title: "Field Day Station Report"
   date: 2026-06-01
   description: "Summary of 40m/20m operations during ARRL Field Day."
   author: "Fred L. Baum (K0FLB)"
   ---

   Your content goes here in standard Markdown.
   ```
5. Click **Commit changes...** and commit to `main`.
6. GitHub Actions will automatically rebuild and deploy the site in ~1–2 minutes!

---

## Adding a New Project

Projects work the same way as posts, but live in the `_projects/` folder and appear on `/projects/`.

1. Navigate to the `_projects/` folder on GitHub.
2. Click **Add file** &rarr; **Create new file**.
3. Name the file using the format: `YYYY-MM-DD-project-slug.md` (e.g. `2026-07-04-40m-efhw-build.md`). The date prefix is dropped from the URL, so the page becomes `/projects/40m-efhw-build/`.
4. Paste the front matter block at the very top (see `_projects/_template.md`):
   ```markdown
   ---
   title: "40m End-Fed Half-Wave Build"
   date: 2026-07-04
   description: "Building and tuning a 49:1 transformer EFHW for portable ops."
   status: "Complete"
   repo: "https://github.com/fredlbaum/efhw-build"
   ---

   Your content goes here in standard Markdown.
   ```
   `status` and `repo` are optional; leave them out if they don't apply.
5. Click **Commit changes...** and commit to `main`.

Projects are listed newest first by `date`.

---

## Adding Gear

Each piece of station gear is its own Markdown file in `_gear/`. It gets its own page and is listed on `/gear/` under its category.

1. Navigate to the `_gear/` folder on GitHub and click **Add file** &rarr; **Create new file**.
2. Name the file after the item, no date needed (e.g. `ic-7300.md` becomes `/gear/ic-7300/`).
3. Paste the front matter block at the very top (see `_gear/_template.md`):
   ```markdown
   ---
   title: "Icom IC-7300"
   category: "transceivers"
   description: "100W HF/6m SDR transceiver; the main shack rig."
   model: "Icom IC-7300"
   bands: "160m–6m"
   status: "In Service"
   acquired: 2024-03-15
   order: 1
   ---

   Optional details: settings, mods, impressions.
   ```
   * `category` must be one of `transceivers`, `antennas`, `portable`, `power`, `accessories` (defined in `_data/gear_categories.json`; these also match the GEAR menu's pop-up links).
   * `model`, `bands`, `status`, `acquired` are optional; blank or missing ones are simply not shown.
   * `order` sorts items within a category (lower first); ties sort by title.
4. Commit to `main`.

---

## Adding a Link

Links on `/links/` are configured in `_data/links.json`, grouped by category.

* To add a link, copy an existing `{ "title", "url", "description" }` block into the right category's `links` list.
* To add a category, copy a whole `{ "category": ..., "links": [...] }` block.
* Mind the commas between blocks; GitHub's editor will flag broken JSON.

---

## Replacing Menu Stand-in Entries

The interactive menu items on the home screen are configured in `_data/menu.json`.

* To change the label, URL, or color of any pill bar, edit `_data/menu.json`.
* For horizontal extension items (Behavior A): change `label`, `extensionText`, and `url`.
* For vertical popup items (Behavior B): change `label`, `subItems`, colors, and URLs.
