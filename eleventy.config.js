import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import site from "./_data/site.js";

export default function (eleventyConfig) {
  // ── Ignored files (not published) ──────────────────────────────────────────
  for (const f of ["README.md", "usage.md", "CLAUDE.md", "LICENSE", "_blog/_template.md", "_projects/_template.md", "_gear/_template.md"]) {
    eleventyConfig.ignores.add(f);
  }

  // ── Passthrough copies ────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy({ ".well-known": ".well-known" });
  eleventyConfig.addPassthroughCopy({ ".well-known/security.txt": "security.txt" });
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/js");

  // ── Docker Polling for Live Reload ─────────────────────────────────────────
  if (process.env.ELEVENTY_POLL) {
    eleventyConfig.setChokidarConfig({ usePolling: true, interval: 500 });
  }

  // ── Liquid Configuration & Filters ────────────────────────────────────────
  // jsTruthy: empty strings (e.g. `repo: ""` left blank from a template) count as false in {% if %}
  eleventyConfig.setLiquidOptions({ timezoneOffset: 0, jsTruthy: true });
  eleventyConfig.addFilter("date_to_xmlschema", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("date_formatted", (d) => {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  });
  eleventyConfig.addFilter("excerpt", (html = "") => {
    const m = html.match(/<p[^>]*>([\s\S]*?)<\/p>/);
    return m ? m[1] : "";
  });

  // ── Gear Collection (sorted by `order`, then title) ───────────────────────
  eleventyConfig.addCollection("gear", (api) =>
    api.getFilteredByGlob("_gear/*.md").sort(
      (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99) || String(a.data.title).localeCompare(String(b.data.title)),
    ),
  );

  // ── Dart Sass Compilation with Dependency Tracking ─────────────────────────
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,
    // main.scss itself rarely changes; without this, edits to _sass/ partials
    // are served from Eleventy's compile cache during `--serve`.
    compileOptions: { cache: false },
    compile(inputContent, inputPath) {
      if (path.basename(inputPath).startsWith("_")) return;
      const result = sass.compileString(inputContent, {
        loadPaths: [path.dirname(inputPath), "_sass"],
        style: "compressed",
      });
      this.addDependencies(
        inputPath,
        result.loadedUrls.filter((u) => u.protocol === "file:").map((u) => fileURLToPath(u)),
      );
      return () => result.css;
    },
  });

  // ── Atom RSS Feed ──────────────────────────────────────────────────────────
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "blog", limit: 10 },
    metadata: {
      language: "en",
      title: site.title,
      subtitle: site.description,
      base: site.url + "/",
      author: site.author,
    },
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
