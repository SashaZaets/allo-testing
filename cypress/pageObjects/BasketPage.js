import {removeNonNumbers} from "../utils";

let instance;
class BasketPage {
  constructor() {
    if (instance) {
      console.error("New instance cannot be created");
    } else {
      instance = this;
    }
  }

  openBasket() {
    cy.get('div.mh-cart button.mh-button').click();
  }

  verifyItemsInfo() {
    cy.get(".products__list .products_list_item").each(($item) => {
      cy.wrap($item).find(".content .title span[data-product-name]").should('exist');
      cy.wrap($item).find(".product_qty_price .price-box__cur").should('exist');
    });
  }

  verifyTotalPrice() {
    let total = 0;
    cy.get(".products__list .products_list_item").each(($item) => {
      const priceText = $item.find(".price-box__cur").text().trim();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '').replace(',', '.'));
      total += price;
    }).then(() => {
      cy.get(".total-box__price").invoke('text').then((totalText) => {
        const expectedTotal = removeNonNumbers(totalText);
        expect(total).to.eq(expectedTotal);
      });
    });
  }

  verifyDeleteButtonClickable() {
    cy.get(".products__list .products_list_item").first().find(".vi__close.remove").should('be.visible');
    // We could also check if .vi__close.remove button doesn't have "disabled=true" attribute, but it's tag is svg not button
  }
}

export const basketPage = new BasketPage();
