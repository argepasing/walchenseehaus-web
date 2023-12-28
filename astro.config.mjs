import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import remarkDirective from "remark-directive";
import m2dx from "astro-m2dx";

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  styleDirectives: true,
};

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  markdown: {
    remarkPlugins: [
      remarkDirective, // required for styleDirectives
      [m2dx, m2dxOptions],
    ],
    extendDefaultPlugins: true,
  },
  vite: {
    define: {
      "import.meta.env.PACKAGE_VERSION": JSON.stringify(`v${process.env.npm_package_version}`),
    },
  },
});
