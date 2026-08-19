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
  // PRICING LOCATORS
  // =========================================================

  get setupFeeSection() {
    return cy.contains('h5', 'Setup Fee:')
      .parent();
  }

  get yourOrderSection() {
    return cy.contains('h3', 'Your Order')
      .parent();
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
  // SUBSCRIPTION TIER VERIFICATION
  // =========================================================

  getTierRadio(tierName) {

    return cy.contains(
      'label',
      tierName
    )
      .closest(
        'div.flex.items-start.justify-between'
      )
      .find(
        'input[type="radio"]'
      );
  }


  verifyEssentialTierSelected() {

    this.getTierRadio('Essential')
      .should('be.checked');

    return this;
  }


  verifyEnterpriseTierSelected() {

    this.getTierRadio('Enterprise')
      .should('be.checked');

    return this;
  }


  verifyAdvancedTierSelected() {

    this.getTierRadio('Advanced')
      .should('be.checked');

    return this;
  }


  verifyTierNotSelected(tierName) {

    this.getTierRadio(tierName)
      .should('not.be.checked');

    return this;
  }


  verifyOnlyOneTierSelected() {

    cy.get('input[type="radio"]')
      .filter(':checked')
      .should('have.length', 1);

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
  // PRICING VERIFICATION
  // =========================================================

  verifySetupFee(expectedSetupFee) {

    cy.contains('h5', 'Setup Fee:')
      .should('be.visible')
      .parent()
      .parent()
      .should('contain.text', expectedSetupFee);

    return this;
  }


  verifySubscriptionAmount(expectedSubscription) {

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
  // SALES TAX VERIFICATION
  // =========================================================

  verifySalesTax() {

    cy.contains(
      'span',
      'Sales Tax'
    )
      .should('be.visible')
      .parent()
      .within(() => {

        cy.get('span')
          .eq(1)
          .invoke('text')
          .then((taxText) => {

            const taxAmount = taxText.trim();

            cy.log(
              `Displayed Sales Tax: ${taxAmount}`
            );

            expect(
              taxAmount,
              'Sales Tax should be displayed as currency'
            ).to.match(
              /^\$\d+\.\d{2}$/
            );

          });

      });

    return this;
  }


  // =========================================================
  // TOTAL DUE TODAY VERIFICATION
  // =========================================================

  verifyTotalDueToday() {

    let setupFee = 0;
    let subscriptionAmount = 0;
    let salesTax = 0;

    cy.contains('h5', 'Setup Fee:')
      .should('be.visible')
      .parent()
      .parent()
      .invoke('text')
      .then((setupFeeText) => {

        const setupFeeMatch =
          setupFeeText.match(/\$[\d,]+\.\d{2}/);

        expect(
          setupFeeMatch,
          'Setup Fee amount'
        ).to.not.be.null;

        setupFee =
          parseFloat(
            setupFeeMatch[0]
              .replace('$', '')
              .replace(/,/g, '')
          );

      });

    cy.contains(
      'Subscription - First Month'
    )
      .should('be.visible')
      .parent()
      .invoke('text')
      .then((subscriptionText) => {

        const subscriptionMatch =
          subscriptionText.match(/\$[\d,]+\.\d{2}/);

        expect(
          subscriptionMatch,
          'Subscription amount'
        ).to.not.be.null;

        subscriptionAmount =
          parseFloat(
            subscriptionMatch[0]
              .replace('$', '')
              .replace(/,/g, '')
          );

      });

    cy.contains(
      'span',
      'Sales Tax'
    )
      .should('be.visible')
      .parent()
      .find('span')
      .eq(1)
      .invoke('text')
      .then((taxText) => {

        const taxMatch =
          taxText.trim().match(/\$[\d,]+\.\d{2}/);

        expect(
          taxMatch,
          'Sales Tax amount'
        ).to.not.be.null;

        salesTax =
          parseFloat(
            taxMatch[0]
              .replace('$', '')
              .replace(/,/g, '')
          );

      });

    cy.then(() => {

      const expectedTotal =
        setupFee +
        subscriptionAmount +
        salesTax;

      const expectedTotalFormatted =
        `$${expectedTotal.toFixed(2)}`;

      cy.log(
        `Setup Fee: $${setupFee.toFixed(2)}`
      );

      cy.log(
        `Subscription: $${subscriptionAmount.toFixed(2)}`
      );

      cy.log(
        `Sales Tax: $${salesTax.toFixed(2)}`
      );

      cy.log(
        `Expected Total: ${expectedTotalFormatted}`
      );

      cy.contains(
        'Total Due Today'
      )
        .should('be.visible')
        .parent()
        .should(
          'contain.text',
          expectedTotalFormatted
        );

    });

    return this;
  }


  // =========================================================
  // COMPLETE PRICING VERIFICATION
  // =========================================================

  verifyTierPricing({
    setupFee,
    subscription
  }) {

    this.verifySetupFee(
      setupFee
    );

    this.verifySubscriptionAmount(
      subscription
    );

    this.verifySalesTax();

    this.verifyTotalDueToday();

    return this;
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
      .should('be.visible')
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
      .should('be.visible')
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
      .should('be.visible')
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
      .should('be.visible')
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