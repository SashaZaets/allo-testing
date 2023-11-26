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

  goToAppleStore() {
    cy.contains('a[href="https://allo.ua/ua/apple-store/"]', "Apple").click({
      force: true,
    });
  }

  selectMacSection() {
    cy.contains('a[href="#mac-section"]', "Mac").click({ force: true });
  }

  openMoreDetails() {
    cy.contains(".button-more-detalis", "Детальніше").click();
  }
}

export const homePage = new HomePage()
