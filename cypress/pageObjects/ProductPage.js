import { removeNonNumbers } from "../utils";

let instance
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

  verifyPriceRange(minPrice, maxPrice) {
    cy.wait(10 * 1000); // wait for applying filters
    cy.get(".products-layout__container .product-card").each(($card) => {
      const priceText =
        $card.find(".v-pb__cur.discount .sum").text().trim() ||
        $card.find(".v-pb__cur .sum").text().trim();
      const price = +removeNonNumbers(priceText);

      expect(price).to.be.at.least(minPrice);
      expect(price).to.be.at.most(maxPrice);
    });
  }
}
export const productPage = new ProductPage()
