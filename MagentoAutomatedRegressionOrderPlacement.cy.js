describe("Order placement process regression", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", () => {
      return false;
    });
  });

  it("Use add to cart hidden button", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(".product-item .actions-primary .tocart")
      .invoke("removeAttr", "hidden")
      .click({ multiple: true, force: true });
    cy.wait(5000);
    cy.get(".message-success > div").should("exist");
  });

  it("View current items in shopping cart", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(":nth-child(3) > .product-item-info").click();
    cy.get("#option-label-size-143-item-168").click();
    cy.get("#option-label-color-93-item-52").click();
    cy.get("#product-addtocart-button").click();
    cy.wait(5000);
    cy.get(".showcart").click();
    cy.get(":nth-child(7) > .secondary > .action > span").click();
    cy.get(".update > span").should("exist");
  });

  it("Add a suggested item in shopping cart", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(":nth-child(3) > .product-item-info").click();
    cy.get("#option-label-size-143-item-168").click();
    cy.get("#option-label-color-93-item-52").click();
    cy.get("#product-addtocart-button").click();
    cy.wait(5000);
    cy.get(".showcart").click();
    cy.get(":nth-child(7) > .secondary > .action > span").click();
    cy.get(
      ":nth-child(2) > .product-item-info > .details > .actions > .actions-primary > form > .action"
    ).click();
    cy.get(".message-success > div").should("exist");
  });

  it("Proceed to checkout", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(".home-pants > .content > .action").click();
    cy.get(":nth-child(12) > .product-item-info").click();
    cy.get("#option-label-size-143-item-172").click();
    cy.get("#option-label-color-93-item-50").click();
    cy.get("#product-addtocart-button").click();
    cy.wait(5000);
    cy.get(".showcart").click();
    cy.get("#top-cart-btn-checkout").click();
    cy.get("#shipping > .step-title").should("exist");
  });

  it("Apply a coupon code", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(":nth-child(1) > .product-item-info").click();
    cy.get("#option-label-size-143-item-167").click();
    cy.get("#option-label-color-93-item-57").click();
    cy.get("#product-addtocart-button").click();
    cy.wait(5000);
    cy.get(".showcart").click();
    cy.get(":nth-child(7) > .secondary > .action > span").click();
    cy.get("#block-discount > .title").click({ force: true });
    cy.wait(3000);
    cy.get("#coupon_code").click({ force: true });
    cy.wait(3000);
    cy.get("#coupon_code").type("20poff", { force: true });
    cy.get(
      "#discount-coupon-form > .fieldset > .actions-toolbar > div.primary > .action"
    ).click({ force: true });
    cy.get(".message-success > div").contains("coupon").should("exist");
  });

  it("Apply an invalid coupon code", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(":nth-child(1) > .product-item-info").click();
    cy.get("#option-label-size-143-item-167").click();
    cy.get("#option-label-color-93-item-57").click();
    cy.get("#product-addtocart-button").click();
    cy.wait(5000);
    cy.get(".showcart").click();
    cy.get(":nth-child(7) > .secondary > .action > span").click();
    cy.get("#block-discount > .title").click({ force: true });
    cy.wait(3000);
    cy.get("#coupon_code")
      .click({ force: true })
      .type("testcode", { force: true });
    cy.wait(3000);
    cy.get(
      "#discount-coupon-form > .fieldset > .actions-toolbar > div.primary > .action"
    ).click({ force: true });
    cy.wait(5000);
    cy.get(".message-error > div").contains("not valid").should("exist");
  });

  it("Select shipping method", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(":nth-child(1) > .product-item-info").click();
    cy.get("#option-label-size-143-item-167").click();
    cy.get("#option-label-color-93-item-57").click();
    cy.get("#product-addtocart-button").click();
    cy.wait(5000);
    cy.get(".showcart").click();
    cy.wait(3000);
    cy.get("#top-cart-btn-checkout").click();
    cy.wait(6000);
    cy.get("#customer-email-fieldset > .required > .control > #customer-email")
      .click()
      .type("Test@test.com");
    cy.get('input[name="firstname"]').type("John");
    cy.get('input[name="lastname"]').type("Doe");
    cy.get('input[name="street[0]"]').type("123 Main St");
    cy.get('input[name="city"]').type("Springfield");
    cy.get('select[name="region_id"]').select("California");
    cy.get('input[name="postcode"]').type("90210");
    cy.get('input[name="telephone"]').type("5551234567");
    cy.get(":nth-child(1) > :nth-child(1) > .radio").click();
    cy.get("button.continue").click();
    cy.get(".ship-via > .shipping-information-title > .action").click();
    cy.get("tbody > :nth-child(2) > :nth-child(1) > .radio").click();
    cy.get("button.continue").click();
    cy.url().should("include", "checkout/#payment");
  });

  it("Place an order", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(":nth-child(1) > .product-item-info").click();
    cy.get("#option-label-size-143-item-167").click();
    cy.get("#option-label-color-93-item-57").click();
    cy.get("#product-addtocart-button").click();
    cy.wait(5000);
    cy.get(".showcart").click();
    cy.wait(3000);
    cy.get("#top-cart-btn-checkout").click();
    cy.wait(10000);
    cy.get("#customer-email-fieldset > .required > .control > #customer-email")
      .click()
      .type("email@test.com");
    cy.get('input[name="firstname"]').type("John");
    cy.get('input[name="lastname"]').type("Doe");
    cy.get('input[name="street[0]"]').type("123 Main St");
    cy.get('input[name="city"]').type("Springfield");
    cy.get('select[name="region_id"]').select("California");
    cy.get('input[name="postcode"]').type("90210");
    cy.get('input[name="telephone"]').type("5551234567");
    cy.get(":nth-child(1) > :nth-child(1) > .radio").click();
    cy.get("button.continue").click();
    cy.get(
      ".payment-method-content > :nth-child(4) > div.primary > .action"
    ).click();
    cy.get(".checkout-success > :nth-child(1)").should("exist");
  });

  it("View placed order", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(".panel > .header > .authorization-link > a").click({ force: true });
    cy.get("#email").click().type("knowledgeempower21@gmail.com");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass"
    )
      .click()
      .type("Pass30rd");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2"
    ).click();
    cy.get(
      ":nth-child(2) > .customer-welcome > .customer-name > .action"
    ).click();
    cy.get(
      ":nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a"
    ).click({ force: true });
    cy.get(".items > :nth-child(2) > a").click();
    cy.get(".actions > .view > span").click();
    cy.get(".order-status").should("exist");
  });

  it("Re-order item", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(".panel > .header > .authorization-link > a").click({ force: true });
    cy.get("#email").click().type("knowledgeempower21@gmail.com");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass"
    )
      .click()
      .type("Pass30rd");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2"
    ).click();
    cy.get(
      ":nth-child(2) > .customer-welcome > .customer-name > .action"
    ).click();
    cy.get(
      ":nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a"
    ).click({ force: true });
    cy.get(".items > :nth-child(2) > a").click();
    cy.get(".actions > .view > span").click();
    cy.get("#reorder-item-5555").click();
    cy.get(
      "#reorder-validate-detail > .actions-toolbar > div.primary > .action"
    ).click();
    cy.wait(3000);
    cy.get(".message-success > div").should("exist");
  });

  it("Add item to cart from wishlist", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(".panel > .header > .authorization-link > a").click();
    cy.get("#email").type("knowledgeempower21@gmail.com");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass"
    ).type("Pass30rd");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2"
    ).click();
    cy.get(":nth-child(5) > .product-item-info").click();
    cy.wait(3000);
    cy.get(".towishlist").click();
    cy.get(
      "#wishlist-view-form > .actions-toolbar > .primary > .tocart"
    ).click();
    cy.get(".message-success").should("exist");
  });

  it("Leave a review for an item", () => {
    cy.visit("https://magento.softwaretestingboard.com");
    cy.get(".panel > .header > .authorization-link > a").click();
    cy.get("#email").type("knowledgeempower21@gmail.com");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass"
    ).type("Pass30rd");
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > div.primary > #send2"
    ).click();
    cy.get(":nth-child(5) > .product-item-info").click();
    cy.get("#tab-label-reviews-title").click();
    cy.get("#Rating_1_label").click();
    cy.wait(5000);
    cy.get("#summary_field").click().type("Worst backpack you could buy");
    cy.get("#review_field").click().type("Lorem ipsum dolor sit");
    cy.get(".actions-primary > .action").click();
    cy.wait(8000);
    cy.get(".message-success").contains("review").should("exist");
  });
});
