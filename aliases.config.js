const path = require("path");

const options = {
  webpackOptions: {
    resolve: {
      alias: {
        "@dto": path.resolve(__dirname, "cypress/src/dto/"),
        "@locators": path.resolve(__dirname, "cypress/src/locators/"),
        "@componentObjects": path.resolve(
          __dirname,
          "cypress/src/componentObjects/"
        ),
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

module.exports = options;
