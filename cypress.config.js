import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 2560,
  viewportHeight: 1700,
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 4,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
