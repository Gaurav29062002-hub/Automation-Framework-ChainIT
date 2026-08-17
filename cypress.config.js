const { defineConfig } = require('cypress');
const fs = require('fs');

module.exports = defineConfig({

  e2e: {

    baseUrl: 'https://develop.chainitorg.com',

    specPattern: 'cypress/e2e/**/*.cy.js',

    supportFile: 'cypress/support/e2e.js',

    // Required for accessing the payment iframe
    chromeWebSecurity: false,

    viewportWidth: 1280,
    viewportHeight: 720,

    screenshotOnRunFailure: true,

    video: true,

    videoCompression: true,

    defaultCommandTimeout: 10000,

    pageLoadTimeout: 30000,

    requestTimeout: 10000,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {

      on('after:spec', (spec, results) => {

        if (!results || !results.video) {
          return;
        }

        const hasFailure = results.tests.some((test) =>
          test.attempts.some(
            (attempt) => attempt.state === 'failed'
          )
        );

        // Keep video only when test fails
        if (!hasFailure) {
          fs.unlinkSync(results.video);
        }
      });

      return config;
    },

  },

});