// cypress.config.ts
import { defineConfig } from "cypress";
import codeCoverageTask from '@cypress/code-coverage/task';
import useBabelrc from '@cypress/code-coverage/use-babelrc';

export default defineConfig({
  e2e: {
    env: {
      NEXT_PUBLIC_ENABLE_MOCK_AUTH: true,
    },
    baseUrl: "http://localhost:3000",
    testIsolation: false,
    defaultCommandTimeout: 25000,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)
      on('file:preprocessor', useBabelrc)
      return config
    },
    supportFile: 'cypress/support/e2e.ts'
  },

  component: {
    defaultCommandTimeout: 20000,
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        mode: "development",
        devtool: false,
      },
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)
      return config
    },
  },
});
