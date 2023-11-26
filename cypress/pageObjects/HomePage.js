let instance;
class HomePage {
  constructor() {
    if (instance) {
      console.error("New instance cannot be created");
    } else {
      instance = this;
    }
  }
  visitAndValidateUrl() {
    cy.visit(Cypress.env("BASE_URL"));
    cy.url().should("eq", Cypress.env("BASE_URL"));
  }

  goToStore(selector, text) {
    cy.contains(selector, text).click({
      force: true,
    });
  }

  selectCategory(selector, option) {
    cy.contains(selector, option).click({ force: true });
  }

  openMoreDetails() {
    cy.contains(".button-more-detalis", "Детальніше").click();
  }

  closeBasketModal() {
    cy.get(".v-modal__close-btn").click();
    cy.wait(1000);
  }

  openCatalog() {
    cy.window().then((window) => {
      if (window.innerWidth > 1024) {
        cy.get(".ct-button").click();
      } else {
        cy.get(".mh-burger__btn").click();
        cy.get(".mh-catalog-btn").click();
      }
    });
  }


}

export const homePage = new HomePage();
