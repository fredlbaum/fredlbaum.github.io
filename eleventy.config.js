import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import site from "./_data/site.js";

export default function (eleventyConfig) {
  // ── Ignored files (not published) ──────────────────────────────────────────
  for (const f of ["README.md", "usage.md", "CLAUDE.md", "LICENSE", "_posts/_template.md"]) {
    eleventyConfig.ignores.add(f);
  }

  // ── Passthrough copies ────────────────────────────────────────────────────
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({ ".well-known": ".well-known" });
  eleventyConfig.addPassthroughCopy({ ".well-known/security.txt": "security.txt" });
  eleventyConfig.addPassthroughCopy("assets/images");
  eleventyConfig.addPassthroughCopy("assets/js");

  // ── Docker Polling for Live Reload ─────────────────────────────────────────
  if (process.env.ELEVENTY_POLL) {
    eleventyConfig.setChokidarConfig({ usePolling: true, interval: 500 });
  }

  // ── Liquid Configuration & Filters ────────────────────────────────────────
  eleventyConfig.setLiquidOptions({ timezoneOffset: 0 });
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

  // ── Dart Sass Compilation with Dependency Tracking ─────────────────────────
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    useLayouts: false,
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
    collection: { name: "posts", limit: 10 },
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
