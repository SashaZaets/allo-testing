import { removeNonNumbers } from "../utils";
import {homePage} from "./HomePage";

let instance;
class ProductPage {
  constructor() {
    if (instance) {
      console.error("New instance cannot be created");
    } else {
      instance = this;
    }
  }

  applyFilters(filterDataIds, priceRange) {
    filterDataIds.forEach((id) => {
      cy.get(`[data-id=${id}]`).click();
    });

    priceRange.forEach((price, i) => {
      cy.get(".f-range__form-input").eq(i).clear().type(price);
    });
  }

  getCurrentProductsWithFilters() {
    cy.wait(10 * 1000); // wait for applying filters
    return cy.get(".products-layout__container .product-card");
  }

  async getCurrentProducts() {
    return cy.get(".products-layout__container .product-card");
  }

  verifyPriceRange(minPrice, maxPrice) {
    const currentProducts = this.getCurrentProductsWithFilters();
    currentProducts.each(($card) => {
      const priceText =
        $card.find(".v-pb__cur.discount .sum").text().trim() ||
        $card.find(".v-pb__cur .sum").text().trim();
      const price = +removeNonNumbers(priceText);

      expect(price).to.be.at.least(minPrice);
      expect(price).to.be.at.most(maxPrice);
    });
  }

  async addProductToBasket(index) {
    this.getCurrentProducts().then(currentProducts => {
      cy.wrap(currentProducts).eq(index).find(".v-btn--cart").click();
      homePage.closeBasketModal();
    });
  }

}
export const productPage = new ProductPage();
