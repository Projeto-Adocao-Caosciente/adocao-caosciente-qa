const { defineConfig } = require('cypress')
require('dotenv').config();

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://adocao-caosciente-frontend.vercel.app',
        env: {
            hideCredentials: true,
            requestMode: true,
            username: process.env.USER,
            password: process.env.PASSWORD,
            userType: process.env.USER_TYPE,
            globalWaitTime: 1300,
        },

        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
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
})