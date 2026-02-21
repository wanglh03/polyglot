// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { remarkImageAssets } from "./src/plugins/remark-image-assets";
import {
  transformerNotationHighlight,
  transformerMetaHighlight,
} from "@shikijs/transformers";
import { typst } from "astro-typst";
import remarkWrapTables from "./src/plugins/remark-wrap-tables.ts";

// Image CDN base URL - configure for your R2 bucket
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || "https://img.example.com";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [
      remarkMath,
      [remarkImageAssets, { baseUrl: IMAGE_BASE_URL }],
      remarkWrapTables(),
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "github-light",
      wrap: true,
      transformers: [
        transformerNotationHighlight(),
        transformerMetaHighlight(),
      ],
    },
  },

  integrations: [
    mdx(),
    typst({
      options: {
        remPx: 14,
      },
      target: (id) => {
        console.debug(`Detecting ${id}`);
        if (id.endsWith(".html.typ") || id.includes("/html/")) return "html";
        return "svg";
      },
      // === Use html-text output rather than hAST ===
      // htmlMode: "text", // added in v0.12.3
      // === <img src="xxx.svg"> instead of inlined <svg> ===
      // emitSvg: true,
      // emitSvgDir: ".astro/typst"
      // === Add non-system fonts here ===
      // fontArgs: [
      //   { fontPaths: ['/system/fonts', '/user/fonts'] },
      //   { fontBlobs: [customFontBuffer] }
      // ],
    }),
  ],
});
