# Authoring & Publishing Guide for k0flb.com

This guide explains how to add and edit articles and menu entries on `k0flb.com` directly through the GitHub web interface.

## Where Everything Lives

Every page's text is in a Markdown (`.md`) file. There are two kinds of pages:

**Entry sections**: a page that lists entries, plus one `.md` file per entry. Add an entry by adding a file to the folder.

| Section | Page intro text | Archive intro text | Entries (one `.md` each) |
|---|---|---|---|
| Blog | `blog.md` | `blog-archive.md` | `_blog/` |
| Projects | `projects.md` | `projects-archive.md` | `_projects/` |
| Gear | `gear.md` | `gear-archive.md` | `_gear/` |

All three sections work the same way:

| | URL |
|---|---|
| List page (10 per page, with Newer/Older links; Gear says Previous/Next) | `/blog/`, `/blog/page/2/`, … |
| Each entry, with a "← All …" link back to the list | `/blog/<file-name>/` |
| Archive of every entry (blog and projects by year, gear by category) | `/blog/archive/` |

On the home screen, each pop-up shows **5 entries** (blog and projects: newest first; gear: by `order`), then an **ALL …** bar to the list page and an **ARCHIVE** bar. These two are set as `extraBars` in `_data/menu.json`.

**File names must be unique after the date, and can't be `archive` or `page`.** The date is dropped from the URL, so `2026-01-01-field-day.md` and `2027-06-01-field-day.md` would both become `/blog/field-day/` and the build fails; use e.g. `2027-06-01-field-day-2027.md`. Likewise `…-archive.md` would collide with `/blog/archive/`.

**Simple pages**: the whole page is one `.md` file. Edit it directly.

| Page | File |
|---|---|
| About | `about.md` |
| Links | `links.md` |
| Guest Book | `guestbook.md` (the form's address is `form_url` in its front matter) |
| The Guide | `guide/index.md` |
| 404 (page not found) | `404.md` (see below) |

The "Return to Interactive Menu" link is added to every page automatically.

---

## Adding a Blog Post

1. Navigate to the `_blog/` folder on GitHub.
2. Click **Add file** &rarr; **Create new file**.
3. Name the file using the format: `YYYY-MM-DD-title-slug.md` (e.g. `2026-06-01-field-day-report.md`).
4. Paste the front matter block at the very top:
   ```markdown
   ---
   title: "Field Day Station Report"
   date: 2026-06-01
   description: "Summary of 40m/20m operations during ARRL Field Day."
   author: "Erick"
   ---

   Your content goes here in standard Markdown.
   ```
5. Click **Commit changes...** and commit to `main`.
6. GitHub Actions will automatically rebuild and deploy the site in ~1–2 minutes!

---

## Adding a New Project

Projects work the same way as blog posts, but live in the `_projects/` folder and appear on `/projects/`.

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
   * `category` must be one of `transceivers`, `antennas`, `portable`, `power`, `accessories`, `computers` (defined in `_data/gear_categories.json`; each is a section on `/gear/`).
   * `model`, `bands`, `status`, `acquired` are optional; blank or missing ones are simply not shown.
   * `order` sorts items within a category (lower first); ties sort by title.
   * Every gear item automatically gets a bar in the home-screen GEAR pop-up. Optional `menuLabel` and `menuTagline` set short text for that bar (defaults: the title, and the category name).
4. Commit to `main`.

---

## The 404 Page

Any address that doesn't exist shows `404.md`: a "DON'T PANIC" banner, one randomly chosen Hitchhiker's gag, a **Try another** button that steps through the rest, and "Did you mean…?" suggestions of real pages with similar addresses.

* **Turn a gag on or off:** in `404.md`'s front matter, set it to `true` or `false` under `gags:`.
* **Preview a gag:** visit `/404.html?gag=<name>`, e.g. `/404.html?gag=text-adventure`.
* **Edit a gag's text:** each gag is its own file in `_includes/not-found/<name>.html`. Animated lines (Marvin's sighs, the Improbability Drive events, the text adventure) are in `assets/js/not-found.js`.

| Gag | What it does |
|---|---|
| `guide-entry` | The Guide's entry for "404", typed out on a green terminal |
| `vogon-notice` | Official demolition notice with a 10-second countdown, then it crumbles |
| `deep-thought` | A 7.5-million-year search that suddenly answers 42 |
| `improbability-drive` | Button that "jumps" the visitor to a random real page on the site |
| `marvin` | Marvin's gloomy service log, one sigh at a time |
| `vogon-poetry` | Original Vogon poem; praise it to leave politely, or get thrown out the airlock |
| `sub-etha` | K0FLB calling the missing page on the air: S-meter at S0, 404 in Morse (click to hear it) |
| `text-adventure` | A tiny playable text adventure: get the towel and hitchhike out, or be demolished |

---

## Editing Simple Pages (About, Links, …)

Open the page's `.md` file (see the table at the top), click the pencil icon, and edit the Markdown below the `---` front matter.

For example, to add a link to `links.md`, add a `###` heading with the link and a description under it, inside the right `##` category:

```markdown
## Radio Clubs

### [ARRL](https://www.arrl.org/)

The national association for amateur radio.
```

`##` headings show as green category titles and `###` headings as blue link titles.

For an entry section (Blog, Projects, Gear), editing its page `.md` file only changes the intro text at the top; the list underneath is built from the entry files.

---

## Replacing Menu Stand-in Entries

The interactive menu items on the home screen are configured in `_data/menu.json`.

* To change the label, URL, or color of any pill bar, edit `_data/menu.json`.
* For horizontal extension items (Behavior A): change `label`, `extensionText`, and `url`.
* For vertical popup items (Behavior B): change `label` and either list `subItems` by hand (each with `label`, `tagline`, `color`, `url`), or set `subItemsFrom` to a collection name to generate one bar per page. The GEAR item uses `"subItemsFrom": "gear"`, cycling through `subItemColors`.
