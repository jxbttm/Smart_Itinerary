import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      NEXT_PUBLIC_ENABLE_MOCK_AUTH: false,
    },
    baseUrl: "http://localhost:3000",
    testIsolation: false,
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) { },
  },

  component: {
    defaultCommandTimeout: 20000,
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
