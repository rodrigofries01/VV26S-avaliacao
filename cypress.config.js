const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Configurações para gravação de vídeo
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 15,
    // Configurações para screenshots
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    // Configurações gerais
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    baseUrl: 'https://www.saucedemo.com'
  },
});
