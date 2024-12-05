const puppeteer = require("puppeteer");

exports.scrape = async (userName) => {
  url = `https://github.com/${userName}`;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.evaluate(
      () => document.querySelector("[class*='bio']").innerText
    );
    await browser.close();
    return content;
  } catch (error) {
    console.log(error);
  }
};
