import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      NEXT_PUBLIC_ENABLE_MOCK_AUTH: true,
    },
    baseUrl: "http://localhost:3000",
    testIsolation: false,
    defaultCommandTimeout: 12000,
    setupNodeEvents(on, config) { },
  },

  component: {
    defaultCommandTimeout: 12000,
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
