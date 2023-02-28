import { existsSync } from "node:fs";
import { cyan, gray } from "kolorist";
// @ts-ignore
import { getFolderSizeBin } from "go-get-folder-size/npm/bin.mjs";
import { defineNuxtModule, logger as _logger } from "@nuxt/kit";

const logger = _logger.withTag("nuxt-size");

interface ModuleOptions {
  showOutput: boolean;
  showBuildDir: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-size",
    configKey: "size",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    showOutput: true,
    showBuildDir: false,
  },
  setup(options, nuxt) {
    const { dev, rootDir, buildDir } = nuxt.options;
    if (dev) return;

    const { showBuildDir, showOutput } = options;

    if (showOutput) {
      useBuildClose(`${rootDir}/.output`, "Σ Output size");
    }

    if (showBuildDir) {
      useBuildClose(buildDir, "Σ BuildDir size");
    }

    function useBuildClose(base: string, tip: string) {
      nuxt.hook("build:done", () => {
        nuxt.hook("close", async () => {
          if (!existsSync(base)) {
            logger.warn(`${base} does not exist`);
            return;
          }
          const size = await getFolderSizeBin(base, true);
          logger.log(
            `${cyan(tip)}: ${size}${gray(" - " + base)}`,
          );
        });
      });
    }
  },
});
