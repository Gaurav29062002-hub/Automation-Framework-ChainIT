class PromocodePage {

  // =====================================================
  // LOCATORS
  // =====================================================

  get promoCodeInput() {
    return cy.get(
      'input[placeholder="Please Enter Promo Code"]'
    );
  }

  get continueWithoutPromoBtn() {
    return cy.contains(
      'button',
      'Continue Without a Promo Code'
    );
  }

  get continueBtn() {
    return cy.get('button').filter((index, element) => {
      return element.innerText.trim() === 'Continue';
    });
  }


  // =====================================================
  // SUCCESS MESSAGE
  // =====================================================

  get onboardingSuccessMessage() {
    return cy.contains(
      "You've successfully completed the first step of onboarding!"
    );
  }

  get onboardingSuccessDescription() {
    return cy.contains(
      'Check your email for what to do next. You can close this tab. Thank you'
    );
  }


  // =====================================================
  // PROMO CODE VALIDATION
  // =====================================================

  get promoCodeLengthError() {
    return cy.contains(
      'Promo code must be exactly 7 letters/numbers.'
    );
  }

  // =====================================================
  // ALPHANUMERIC VALIDATION
  // =====================================================

  get promoCodeAlphanumericError() {
    return cy.contains(
      'Promo code must be alphanumeric only'
    );
  }


  // =====================================================
  // SUBSCRIPTION PAGE
  // =====================================================

  get subscriptionPage() {
    return cy.contains(
      'Subscription'
    );
  }


  // =====================================================
  // VERIFICATION
  // =====================================================

  verifyPromoCodeSuccess() {

    this.onboardingSuccessMessage
      .should('be.visible');

    this.onboardingSuccessDescription
      .should('be.visible');

    return this;
  }


  verifyInvalidPromoCode() {

    cy.contains(
      'Invalid promo code'
    )
      .should('be.visible');

    return this;
  }


  verifyPromoCodeLengthError() {

    this.promoCodeLengthError
      .should('be.visible');

    return this;
  }


  verifyNoPromoCodeLengthError() {

    this.promoCodeLengthError
      .should('not.exist');

    return this;
  }


  verifySubscriptionPage() {

    this.subscriptionPage
      .should('be.visible');

    return this;
  }

  verifyPromoCodeAlphanumericError() {

    this.promoCodeAlphanumericError
      .should('be.visible');

    return this;
  }


  // =====================================================
  // ACTION METHODS
  // =====================================================

  enterPromoCode(promoCode) {

    this.promoCodeInput
      .should('be.visible')
      .clear()
      .type(promoCode);

    return this;
  }


  clearPromoCode() {

    this.promoCodeInput
      .should('be.visible')
      .clear();

    return this;
  }


  clickContinueBtn() {

    this.continueBtn
      .should('be.visible')
      .should('have.length', 1)
      .click();

    return this;
  }


  clickContinuewithoutPromoBtn() {

    this.continueWithoutPromoBtn
      .should('be.visible')
      .click();

    return this;
  }

}


export default new PromocodePage();