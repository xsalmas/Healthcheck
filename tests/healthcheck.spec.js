import { test, expect } from "@playwright/test";
import { shopPathList } from "../src/resources/testData/shopPaths";
import { searchPathList } from "../src/resources/testData/searchPath";
import { brandMap } from "../src/resources/testData/brandsList";
import { productMap } from "../src/resources/testData/productList";

const brand = Object.keys(brandMap);
let currentBrand;
let baseUrl;
let env = process.env.ENVIRONMENT;

brand.forEach((currentBrand) => {
  test.describe(`Health check for ${currentBrand}`, () => {
    test(`Home page availability ${currentBrand}`, async ({ page }) => {
      baseUrl = `https://www.${env}.${brandMap[`${currentBrand}`]}.com/`;
      console.log(`base url ${baseUrl}`);
      await page.goto(baseUrl);
      await page.waitForTimeout(1000);
      if (`${currentBrand}` == "WE") {
        expect(await page.locator("#home").isVisible()).toBe(true);
      }
      expect(await page.locator("#homepage").isVisible()).toBe(true);
    });
    test(`Shop page availability ${currentBrand}`, async ({ page }) => {
      baseUrl = `https://www.${env}.${brandMap[`${currentBrand}`]}.com/`;
      const shopPageUrl = baseUrl + shopPathList[`${currentBrand}`];
      console.log(`shopPageUrl ${shopPageUrl}`);
      await page.goto(shopPageUrl);
      expect(
        await page.locator("[data-test-id= Global-header]").isVisible()
      ).toBe(true);
      expect(await page.locator(`.shop-main-container`).isVisible()).toBe(true);
    });
    test(`Search page availability ${currentBrand}`, async ({ page }) => {
      baseUrl = `https://www.${env}.${brandMap[`${currentBrand}`]}.com/`;
      const searchUrl = baseUrl + searchPathList[`${currentBrand}`];
      await page.goto(searchUrl);
      console.log(searchUrl);
      expect(
        await page.locator("[data-test-id= Global-header]").isVisible()
      ).toBe(true);
      expect(await page.locator("[data-test-id= search]").isVisible()).toBe(
        true
      );
    });
    test(`Favorites page availability ${currentBrand}`, async ({ page }) => {
      baseUrl = `https://www.${env}.${brandMap[`${currentBrand}`]}.com/`;
      await page.goto(baseUrl + "favorites/");
      console.log(baseUrl + "favorites/");
      expect(
        await page.locator("[data-test-id= Global-header]").isVisible()
      ).toBe(true);
      expect(await page.locator("#favorites-page").isVisible()).toBe(true);
    });

    test(`PIP page availability ${currentBrand}`, async ({ page }) => {
      baseUrl = `https://www.${env}.${brandMap[`${currentBrand}`]}.com/`;
      await page.goto(baseUrl + productMap[`${currentBrand}`]);
      console.log(baseUrl + productMap[`${currentBrand}`]);
      expect(
        await page.locator("[data-test-id= Global-header]").isVisible()
      ).toBe(true);
      if (`${currentBrand}` == "PB") {
        await page.waitForTimeout(5000);
      }
      expect(
        await page.locator("[data-test-id= purchasing-container]").isVisible()
      ).toBe(true);
    });
  });
});
