import { homePage } from "../pageObjects/HomePage";
import { productPage } from "../pageObjects/ProductPage";
import { basketPage } from "../pageObjects/BasketPage";

describe("Basket Test", () => {
  it("Clear items from the basket", async () => {
    homePage.visitAndValidateUrl();
    homePage.goToStore('a[href="https://allo.ua/ua/apple-store/"]', "Apple");
    homePage.selectCategory('a[href="#mac-section"]', "Mac");
    homePage.openMoreDetails();
    await productPage.addProductToBasket(0);
    homePage.openCatalog();
    homePage.goToStore('a[href="https://allo.ua/ua/xiaomi-store/"]', "Xiaomi");
    cy.get(
      'a[href="https://allo.ua/ru/products/notebooks/proizvoditel-xiaomi/"]'
    )
      .invoke("removeAttr", "target")
      .click(); //To prevent opening new tab in browser
    await productPage.addProductToBasket(0);
    basketPage.openBasket();
    basketPage.clearBasket();
  });
});
