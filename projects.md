---
layout: projects-index
title: Projects
description: "Antenna builds, digital mode experiments, and hardware projects from K0FLB."
pagination:
  data: collections.projects
  size: 10
  reverse: true
  alias: entries
  generatePageOnEmptyData: true
permalink: "{% if pagination.pageNumber > 0 %}/projects/page/{{ pagination.pageNumber | plus: 1 }}/{% else %}/projects/{% endif %}"
---

Antenna builds, digital mode experiments, and hardware projects from **K0FLB**.
