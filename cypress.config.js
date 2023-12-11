require("dotenv").config();
const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const options = require("./aliases.config");

module.exports = defineConfig({
  projectId: '4nu1ow',
  e2e: {
    baseUrl: "https://adocao-caosciente-frontend.vercel.app",
    env: {
      hideCredentials: true,
      requestMode: true,
      username: process.env.USER,
      password: process.env.PASSWORD,
      userType: process.env.USER_TYPE,
      globalWaitTime: 1300,
      defaultCommandTimeout: 10000,
    },

    setupNodeEvents(on, config) {
      on("file:preprocessor", webpack(options));
      require("cypress-mochawesome-reporter/plugin")(on);
    },

    experimentalOriginDependencies: true,
    experimentalRunAllSpecs: true,
  },
  reporter: "cypress-mochawesome-reporter",
  viewportWidth: 1366,
  viewportHeight: 768,
  fixturesFolder: "cypress/fixtures",
  scrollBehavior: "center",
  video: false,
});