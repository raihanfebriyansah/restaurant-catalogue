/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "e2e/**/*.test.js",
  output: "e2e/output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: "http://localhost:8080",
      show: true,
    },
  },
  include: {
    I: "./steps_file.js",
  },
  name: "restaurant-catalogue",
};
