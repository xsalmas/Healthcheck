const config = {
  timeout: 60000,
  reties: 0,
  use: {
    headless: false,
    actionTimeout: 55000,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "off",
    httpCredentials: { username: "pbqaenv", password: "Bl@ck2ye" },
    screenshot: "off",
  },
  reporter: "allure-playwright",
};

module.exports = config;
