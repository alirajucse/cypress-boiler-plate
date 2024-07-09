const { defineConfig } = require("cypress");
const process = require("process");
const path = require("node:path");
const { beforeRunHook } = require("cypress-mochawesome-reporter/lib");

// We maintain all FC environment specific details in this file.
const appEnvConfig = require(path.join(process.cwd(), "appenv.json"));

// Choose the current FC environment applied. (dev, qa1, qa2, preprod, prod)
const appEnv = (process.env.APPENV || appEnvConfig.default).trim();
console.log("Chosen app environment:", appEnv);

const appconf = appEnvConfig[appEnv];

appconf.baseUrl = process.env.APP_BASE_URL || appconf.baseUrl;
appconf.apiUrl = process.env.APP_API_URL || appconf.apiUrl;
appconf.apiKey = process.env.APP_API_KEY || appconf.apiKey;
appconf.loginEmail = process.env.APP_LOGIN_EMAIL || appconf.loginEmail;
appconf.loginPassword = process.env.APP_LOGIN_PASSWORD || appconf.loginPassword;

//console.log(appconf);

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    viewportWidth: 1400,
    viewportHeight: 960,
    video: false,
    defaultCommandTimeout: 30000,
    testIsolation: false,
    specPattern: process.env.SPECPATTERN || "cypress/e2e/**/*.spec.ts",
    downloadsFolder: process.env.CYPRESS_DOWNLOADS_DIR || "cypress/downloads",
    screenshotsFolder:
      process.env.CYPRESS_SCREENSHOTS_DIR || "cypress/screenshots",
    chromeWebSecurity: false,
    video: false,
    retries: {
      runMode:
        (process.env.CYPRESS_RETRIES &&
          parseInt(process.env.CYPRESS_RETRIES)) ||
        1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      on("before:run", async (details) => {
        await beforeRunHook(details);
      });
    },
    env: {
      ...appconf, // Merge the chosen app environment config values into Cypress env.
    },
  },
});
