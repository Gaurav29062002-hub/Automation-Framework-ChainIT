class GetStartedPage {

  // =====================================================
  // LOCATORS
  // =====================================================

  get pageTitle() {
    return cy.contains('Welcome!');
  }

  get getStartedButton() {
    return cy.contains('Get Started');
  }

  get firstCheckbox() {
    return cy.get('input[type="checkbox"].ui-accent-\\[\\#80C342\\]').eq(0);
  }

  get secondCheckbox() {
    return cy.get('input[type="checkbox"].ui-accent-\\[\\#80C342\\]').eq(1);
  }

  get nextButton() {
    return cy.contains('Next');
  }


  // =====================================================
  // VERIFICATIONS
  // =====================================================

  verifyPageLoaded() {
    this.pageTitle.should('be.visible');

    return this;
  }


  // =====================================================
  // ACTIONS
  // =====================================================

  clickGetStartedBtn() {
    this.getStartedButton
      .should('be.visible')
      .click();

    return this;
  }


  clickFirstCheckbox() {
    this.firstCheckbox
      .should('be.visible')
      .check()
      .should('be.checked');

    return this;
  }


  clickSecondCheckbox() {
    this.secondCheckbox
      .should('be.visible')
      .check()
      .should('be.checked');

    return this;
  }


  clickNextButton() {
    this.nextButton
      .should('be.visible')
      .click();

    return this;
  }

}


export default new GetStartedPage();