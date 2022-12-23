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
    test(`PIP page availability ${currentBrand}`, async ({ page }) => {
      baseUrl = `https://www.${env}.${brandMap[`${currentBrand}`]}.com/`;
      await page.goto(baseUrl + productMap[`${currentBrand}`]);
      console.log(baseUrl + productMap[`${currentBrand}`]);
      expect(
        await page.locator("[data-test-id= Global-header]").isVisible()
      ).toBe(true);
      await page.waitForTimeout(5000);
      expect(
        await page.locator("[data-test-id= purchasing-container]").isVisible()
      ).toBe(true);
    });
  });
});
