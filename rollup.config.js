import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-import-css";

const isProd = process.env.BUILD === "production";

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

export default {
  input: "src/my-main.ts",
  output: {
    file: "build/main.js",
    sourcemap: "inline",
    sourcemapExcludeSources: isProd,
    format: "cjs",
    exports: "default",
    banner,
  },
  external: ["obsidian"],
  plugins: [
    typescript(),
    nodeResolve({ browser: true }),
    commonjs(),
    css({
      output: "build/styles.css",
    }),
    copy({
      targets: [{ src: "manifest.json", dest: "build" }],
    }),
  ],
};
