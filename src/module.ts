import { defineNuxtModule } from "@nuxt/kit";
import { getFolderSizeBin } from "go-get-folder-size/npm/bin";

export default defineNuxtModule({
  meta: {
    name: "nuxt-size",
    configKey: "nuxt-size",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  setup(options, nuxt) {
    if (nuxt.options.dev) return;

    nuxt.hook("close", async () => {
      const size = await getFolderSizeBin(".output", true);
      console.log(`\nThe output size is ${size}\n`);
    });
  },
});
