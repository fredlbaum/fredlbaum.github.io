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

## Replacing Menu Stand-in Entries

The interactive menu items on the home screen are configured in `_data/menu.json`.

* To change the label, URL, or color of any pill bar, edit `_data/menu.json`.
* For horizontal extension items (Behavior A): change `label`, `extensionText`, and `url`.
* For vertical popup items (Behavior B): change `label`, `subItems`, colors, and URLs.
