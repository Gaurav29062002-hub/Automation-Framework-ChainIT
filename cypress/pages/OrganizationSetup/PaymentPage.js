class PaymentPage {

  // =========================================================
  // LOCATORS
  // =========================================================

  get advancedTier() {
    return cy.contains('label', 'Advanced');
  }

  get essentialTier() {
    return cy.contains('label', 'Essential');
  }

  get enterpriseTier() {
    return cy.contains('label', 'Enterprise');
  }

  get firstCheckbox() {
    return cy.get('input[type="checkbox"]').eq(0);
  }

  get secondCheckbox() {
    return cy.get('input[type="checkbox"]').eq(1);
  }

  get paymentIframe() {
    return cy.get('#payment-form');
  }


  // =========================================================
  // SUBSCRIPTION
  // =========================================================

  selectAdvancedTier() {

    this.advancedTier
      .should('be.visible')
      .click();

    return this;
  }


  selectEssentialTier() {

    this.essentialTier
      .should('be.visible')
      .click();

    return this;
  }


  selectEnterpriseTier() {

    this.enterpriseTier
      .should('be.visible')
      .click();

    return this;
  }


  // =========================================================
  // CHECKBOXES
  // =========================================================

  selectFirstCheckbox() {

    this.firstCheckbox
      .should('be.visible')
      .check();

    return this;
  }


  selectSecondCheckbox() {

    this.secondCheckbox
      .should('be.visible')
      .check();

    return this;
  }


  // =========================================================
  // PRICING LOCATORS
  // =========================================================

  get setupFeeSection() {

    return cy.contains(
      'h5',
      'Setup Fee:'
    )
      .parent()
      .parent();
  }


  // =========================================================
  // PRICING VERIFICATION
  // =========================================================

  verifySetupFee(expectedSetupFee) {

    this.setupFeeSection
      .should('be.visible')
      .and(
        'contain.text',
        expectedSetupFee
      );

    return this;
  }


  verifySubscriptionAmount(
    expectedSubscription
  ) {

    cy.contains(
      'Subscription - First Month'
    )
      .should('be.visible')
      .parent()
      .should(
        'contain.text',
        expectedSubscription
      );

    return this;
  }


  // =========================================================
  // SALES TAX
  // =========================================================

  verifySalesTax(expectedSalesTax) {

    cy.contains(
      'span',
      'Sales Tax'
    )
      .should('be.visible')
      .parent()
      .should(
        'contain.text',
        expectedSalesTax
      );

    return this;
  }


  // =========================================================
  // TOTAL DUE TODAY
  // =========================================================

  verifyTotalDueToday(expectedTotal) {

    cy.contains(
      'span',
      'Total Due Today'
    )
      .should('be.visible')
      .parent()
      .should(
        'contain.text',
        expectedTotal
      );

    return this;
  }


  // =========================================================
  // TAX API
  // =========================================================

  waitForTaxCalculation() {

    return cy.wait(
      '@calculateTax',
      {
        timeout: 30000
      }
    );
  }


  // =========================================================
  // CONVERT API CENTS TO UI CURRENCY
  // =========================================================

  convertCentsToCurrency(cents) {

    const amount =
      Number(cents) / 100;

    return `$${amount.toFixed(2)}`;
  }


  // =========================================================
  // VERIFY TAX FROM API
  // =========================================================

  verifySalesTaxFromApi() {

    return this.waitForTaxCalculation()
      .then((interception) => {

        expect(
          interception.response,
          'Tax API response'
        ).to.exist;

        const response =
          interception.response.body;

        expect(
          response,
          'Tax API response body'
        ).to.have.property(
          'taxAmountToCollect'
        );

        const taxInCents =
          Number(
            response.taxAmountToCollect
          );

        expect(
          taxInCents,
          'Tax amount returned by API'
        ).to.be.a('number');

        const expectedSalesTax =
          this.convertCentsToCurrency(
            taxInCents
          );

        cy.log(
          `Tax API amount: ${taxInCents} cents`
        );

        cy.log(
          `Expected Sales Tax: ${expectedSalesTax}`
        );

        cy.contains(
          'span',
          'Sales Tax'
        )
          .should('be.visible')
          .parent()
          .should(
            'contain.text',
            expectedSalesTax
          );

        return cy.wrap(
          expectedSalesTax
        );

      });
  }


  // =========================================================
  // GET DISPLAYED PRICE
  // =========================================================

  getDisplayedAmount(
    labelText
  ) {

    return cy.contains(
      'span',
      labelText
    )
      .should('be.visible')
      .parent()
      .find('span')
      .last()
      .invoke('text')
      .then((text) => {

        const cleanedText =
          text
            .trim()
            .replace('$', '')
            .replace(/,/g, '');

        const amount =
          Number(cleanedText);

        expect(
          amount,
          `${labelText} displayed amount`
        ).to.not.be.NaN;

        return amount;

      });
  }


  // =========================================================
  // VERIFY TOTAL USING API TAX
  // =========================================================

  verifyTotalCalculation(
    expectedSetupFee,
    expectedSubscription,
    taxInCents
  ) {

    const setupFee =
      Number(
        expectedSetupFee
          .replace('$', '')
          .replace(/,/g, '')
      );

    const subscription =
      Number(
        expectedSubscription
          .replace('$', '')
          .replace(/,/g, '')
      );

    const salesTax =
      Number(taxInCents) / 100;

    const expectedTotal =
      setupFee +
      subscription +
      salesTax;

    const formattedExpectedTotal =
      `$${expectedTotal.toFixed(2)}`;

    cy.log(
      `Setup Fee: $${setupFee.toFixed(2)}`
    );

    cy.log(
      `Subscription: $${subscription.toFixed(2)}`
    );

    cy.log(
      `Sales Tax: $${salesTax.toFixed(2)}`
    );

    cy.log(
      `Expected Total: ${formattedExpectedTotal}`
    );

    cy.contains(
      'span',
      'Total Due Today'
    )
      .should('be.visible')
      .parent()
      .should(
        'contain.text',
        formattedExpectedTotal
      );

    return this;
  }


  // =========================================================
  // COMPLETE DYNAMIC PRICING VALIDATION
  // =========================================================

  verifyTierPricing({
    setupFee,
    subscription
  }) {

    // ---------------------------------------------
    // Fixed pricing
    // ---------------------------------------------

    this.verifySetupFee(
      setupFee
    );

    this.verifySubscriptionAmount(
      subscription
    );


    // ---------------------------------------------
    // Dynamic tax + total
    // ---------------------------------------------

    return this.waitForTaxCalculation()
      .then((interception) => {

        expect(
          interception.response,
          'Tax API response'
        ).to.exist;

        const response =
          interception.response.body;

        const taxInCents =
          Number(
            response.taxAmountToCollect
          );

        const expectedSalesTax =
          this.convertCentsToCurrency(
            taxInCents
          );

        cy.log(
          `Tax API Response: ${JSON.stringify(response)}`
        );

        cy.log(
          `Sales Tax: ${expectedSalesTax}`
        );

        // -----------------------------------------
        // Verify Sales Tax
        // -----------------------------------------

        this.verifySalesTax(
          expectedSalesTax
        );


        // -----------------------------------------
        // Verify Total
        // -----------------------------------------

        this.verifyTotalCalculation(
          setupFee,
          subscription,
          taxInCents
        );

      })
      .then(() => {

        return this;

      });
  }


  // =========================================================
  // PAYMENT IFRAME
  // =========================================================

  waitForPaymentIframe() {

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should('be.visible')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        expect(
          iframeDocument.body,
          'Payment iframe body'
        ).to.exist;

      });

    return this;
  }


  // =========================================================
  // PAYMENT FIELD HELPER
  // =========================================================

  getPaymentField(
    selector,
    fieldName
  ) {

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          `${fieldName} field`
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          `${fieldName} field`
        ).to.exist;

        cy.wrap(field);

      });

    return this;
  }


  // =========================================================
  // CARDHOLDER NAME
  // =========================================================

  enterCardholderName(name) {

    const selector =
      'input[name="cardholdername"]';

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          'Cardholder name field'
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const field =
          iframeDocument.querySelector(
            selector
          );

        cy.wrap(field)
          .clear()
          .type(name);

      });

    return this;
  }


  // =========================================================
  // CARD NUMBER
  // =========================================================

  enterCardNumber(cardNumber) {

    const selector =
      'input[name="account"]';

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          'Card number field'
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const field =
          iframeDocument.querySelector(
            selector
          );

        cy.wrap(field)
          .clear()
          .type(cardNumber);

      });

    return this;
  }


  // =========================================================
  // EXPIRY MONTH
  // =========================================================

  enterExpiryMonth(month) {

    const selector =
      '#exp_month';

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          'Expiry month field'
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const field =
          iframeDocument.querySelector(
            selector
          );

        cy.wrap(field)
          .select(month);

      });

    return this;
  }


  // =========================================================
  // EXPIRY YEAR
  // =========================================================

  enterExpiryYear(year) {

    const selector =
      '#exp_year';

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          'Expiry year field'
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const field =
          iframeDocument.querySelector(
            selector
          );

        cy.wrap(field)
          .select(year);

      });

    return this;
  }


  // =========================================================
  // CVV
  // =========================================================

  enterCVV(cvv) {

    const selector =
      '#cv';

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          'CVV field'
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const field =
          iframeDocument.querySelector(
            selector
          );

        cy.wrap(field)
          .clear()
          .type(cvv);

      });

    return this;
  }


  // =========================================================
  // ZIP CODE
  // =========================================================

  enterZipCode(zipCode) {

    const selector =
      'input[name="zip"]';

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const field =
          iframeDocument.querySelector(
            selector
          );

        expect(
          field,
          'ZIP code field'
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const field =
          iframeDocument.querySelector(
            selector
          );

        cy.wrap(field)
          .clear()
          .type(zipCode);

      });

    return this;
  }


  // =========================================================
  // PAY NOW
  // =========================================================

  clickPayNow() {

    const selector =
      '#payment-submit-button';

    cy.get('#payment-form', {
      timeout: 30000
    })
      .should('exist')
      .should(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        expect(
          iframeDocument,
          'Payment iframe document'
        ).to.exist;

        const button =
          iframeDocument.querySelector(
            selector
          );

        expect(
          button,
          'Pay Now button'
        ).to.exist;

      })
      .then(($iframe) => {

        const iframeDocument =
          $iframe[0].contentDocument;

        const button =
          iframeDocument.querySelector(
            selector
          );

        expect(
          button,
          'Pay Now button'
        ).to.exist;

        expect(
          button,
          'Pay Now button'
        ).to.be.visible;

        cy.wrap(button)
          .click();

      });

    return this;
  }


  // =========================================================
  // SUCCESS VERIFICATION
  // =========================================================

  verifyOnboardingSuccess() {

    cy.contains(
      'You\'ve successfully completed the first step of onboarding!',
      {
        timeout: 30000
      }
    )
      .should('be.visible');

    cy.contains(
      'Check your email for what to do next.',
      {
        timeout: 30000
      }
    )
      .should('be.visible');

    cy.contains(
      'You can close this tab. Thank you!',
      {
        timeout: 30000
      }
    )
      .should('be.visible');

    return this;
  }

}


export default new PaymentPage();