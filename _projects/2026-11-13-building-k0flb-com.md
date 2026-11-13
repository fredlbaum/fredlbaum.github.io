---
title: "Building k0flb.com"
date: 2026-11-13
description: "How this site came together: a Hitchhiker's Guide-inspired, Markdown-powered home for projects, life, ham radio, network security, and retro computing."
status: "In Progress"
repo: "https://github.com/fredlbaum/fredlbaum.github.io"
menuLabel: "Building k0flb.com"
menuTagline: "This very site"
---

Every hitchhiker needs a guide. This one is mine.

**k0flb.com** is my corner of the internet: a place to write about the projects I'm building, the life I'm living (the dogs and my wife feature prominently), my career as a network security engineer, and my long-running soft spot for retro computing and gaming. The goal was never a résumé or a polished portfolio. I wanted something that's fun to poke around in, and fun for me to keep adding to.

### What It Is

The home screen is an interactive menu of rainbow "pill" bars. Hover over BLOG, PROJECTS, or GEAR and a stack of the newest entries slides out beside it; the simpler pages (Links, Guest Book, About) stretch out to show what's inside. Everything else is an ordinary, readable page.

Under the hood:

* **Blog, Projects, and Gear** are each a folder of Markdown files. Adding a post is just adding a file, and the menu, list pages, archives, sitemap, and RSS feed all update themselves.
* **Simple pages** like About and Links are single Markdown files I can edit straight from GitHub.
* **The 404 page** is a small collection of jokes: a Vogon demolition notice, Deep Thought's 7.5-million-year search, Marvin's service log, a K0FLB radio call that nobody answers, and a tiny text adventure where you'd better grab your towel.

It's built with [Eleventy](https://www.11ty.dev/) and Sass, and published to GitHub Pages automatically every time I push a change.

### Influences

* **The Hitchhiker's Guide to the Galaxy.** The menu is inspired by the Guide's animated interface in the 2005 film, all bright colored bars on a yellow screen. Douglas Adams' sense of humor runs through the rest of it, from the **DON'T PANIC** button to the 404 page.
* **Amateur radio.** K0FLB is my callsign, so the site doubles as my "station": a gear section for the shack, and the occasional *73* sign-off.
* **The hacker community.** Northern Colorado's security groups, [NoCo 2600](https://noco2600.org/) and [DC970](https://dc970.org/), helped inspire the playful side. NoCo 2600's rotating, literary 404 page directly inspired mine.
* **Retro computing and gaming.** Classic '80s text adventures shaped the 404 page's mini-game, and my Commodore 64 Ultimate earned the first spot in the gear section.
* **Keep it simple.** Plain Markdown files, no database, nothing to log in to. If I can type it, I can publish it.

### Where It Started

The first version of this site was a single page I put up on GitHub Pages in 2023. In November 2026 I rebuilt it from the ground up into what you see now: the interactive menu, the Markdown-based sections, the archives, and the 404 page.

### What's Next

Mostly, writing. Expect blog posts about everyday life and the dogs, project write-ups from the shack and the workbench, notes from the world of network security, and more retro hardware as it lands on my desk. The site itself will keep evolving too. That's why this project's status says **In Progress**.

Thanks for stopping by. Don't forget to [sign the guest book](/guestbook/), and don't panic.
