import { homePage } from "../pageObjects/HomePage";
import { productPage } from "../pageObjects/ProductPage";

describe("Search the item", () => {
  it("Verify that all items are correctly displayed according to your searching request",  () => {
    homePage.visitAndValidateUrl();
    cy.fixture("search").then(({ searchByName }) => {
      searchByName.forEach((text) => {
        homePage.inputTextToSearch(text);
        productPage.getCurrentProductsWithFilters().then((products) => {
          products.each((product) => {
            cy.wrap(product)
              .get("a.product-card__title")
              .invoke("text")
              .should("contain", text);
            homePage.clearInputToSearch();
          });
        });
      });
    });
  });
});
