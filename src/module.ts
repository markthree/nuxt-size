import { cyan, gray } from "kolorist";
import { defineNuxtModule, logger as _logger } from "@nuxt/kit";
import { getFolderSizeBin } from "go-get-folder-size/npm/bin";

const logger = _logger.withTag("nuxt-size");

export default defineNuxtModule({
  meta: {
    name: "nuxt-size",
    configKey: "nuxt-size",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  setup(options, nuxt) {
    const { dev, rootDir } = nuxt.options;
    if (dev) return;

    const output = `${rootDir}/.output`;
    nuxt.hook("close", async () => {
      const size = await getFolderSizeBin(output, true);

      console.log("\n");
      logger.log(
        `${cyan("Σ Output size")}: ${size}${gray(" - " + output)}\n`,
      );
    });
  },
});
