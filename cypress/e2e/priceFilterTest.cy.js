import { homePage } from "../pageObjects/HomePage";
import { productPage } from "../pageObjects/ProductPage";

describe("Price Filter Test", () => {
  it("Verifies if the price filter is working correctly", async () => {
    homePage.visitAndValidateUrl();
    homePage.goToStore('a[href="https://allo.ua/ua/apple-store/"]', "Apple");
    homePage.selectCategory('a[href="#mac-section"]', "Mac");
    homePage.openMoreDetails();

    const { filterDataIds, priceRange } = await cy.fixture("filters");
    productPage.applyFilters(filterDataIds, priceRange);

    const [minPrice, maxPrice] = priceRange.map(Number);
    productPage.verifyPriceRange(minPrice, maxPrice);
  });
});
