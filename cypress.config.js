const { defineConfig } = require("cypress");
const path = require("path");
const webpack = require("@cypress/webpack-preprocessor");
require("dotenv").config();

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
    },

    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            alias: {
              "@dto": path.resolve(__dirname, "cypress/src/dto/"),
              "@locators": path.resolve(__dirname, "cypress/src/locators/"),
              "@componentObjects": path.resolve(__dirname, "cypress/src/componentObjects/"),
              "@componentsObjects": path.resolve(
                __dirname,
                "cypress/src/componentsObjects"
              ),
              "@pageObjects": path.resolve(__dirname, "cypress/src/pageObjects/"),
              "@routes": path.resolve(__dirname, "cypress/src/routes/"),
              "@services": path.resolve(__dirname, "cypress/src/services/"),
              "@util": path.resolve(__dirname, "cypress/src/util/"),
            },
          },
        },
      };

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