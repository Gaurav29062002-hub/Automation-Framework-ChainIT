class CreateorgProfile {

  // =====================================================
  // LOCATORS
  // =====================================================

  get pageTitle() {
    return cy.contains('Create Organization Profile');
  }

  get orgname() {
    return cy.get(
      'input[placeholder="Enter your organization legal name"]'
    );
  }

  get selectFormationState() {
    return cy.contains('button', 'Select state');
  }

  get selectIndustry() {
    return cy.contains('button', 'Select industry');
  }

  get website() {
    return cy.get(
      'input[placeholder="Enter your organization website"]'
    );
  }

  get taxIdnumber() {
    return cy.get(
      'input[placeholder="Enter your organization TIN"]'
    );
  }

  get orgAddress() {
    return cy.get(
      'input[placeholder="Enter your company\'s registered organization  address"]'
    );
  }

  get city() {
    return cy.get(
      'input[placeholder="Enter city"]'
    );
  }

  get selectState() {
    return cy.contains('button', 'Select state');
  }

  get postalCode() {
    return cy.get(
      'input[placeholder="Enter postal code"]'
    );
  }

  get orgEmailAddress() {
    return cy.get(
      'input[placeholder="Enter email address"]'
    );
  }

  get soleUserRadiobtn() {
    return cy.contains(
      'label',
      'Yes - I am the sole owner and authorized representative'
    );
  }

  get nonsoleUserRadiobtn() {
    return cy.contains(
      'label',
      'No or I\'m not sure - other owners, officers, shareholders, members, managers, directors, or controlling parties may need to be added'
    );
  }

  get UsernextButton() {
    return cy.contains(
      'button',
      'Next'
    );
  }


  // =====================================================
  // DYNAMIC LOCATORS
  // =====================================================

  stateFormationOption(formationstate) {
    return cy.contains(
      '[role="option"]',
      formationstate
    );
  }

  stateOption(state) {
    return cy.contains(
      '[role="option"]',
      state
    );
  }

  industryOption(industry) {
    return cy.contains(
      '[role="option"]',
      industry
    );
  }


  // =====================================================
  // VERIFICATION
  // =====================================================

  verifyPageLoaded() {

    this.pageTitle
      .should('be.visible');

    return this;
  }


  // =====================================================
  // ORGANIZATION PROFILE VALIDATION HELPER
  // =====================================================

  verifyInputFieldValidation(
    inputSelector,
    expectedMessage
  ) {

    cy.get(inputSelector)
      .should('be.visible')
      .closest('div')
      .find('small')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const actualMessage = text
          .replace(/\u00a0/g, ' ')
          .trim();

        expect(actualMessage)
          .to.equal(expectedMessage);

      });

    return this;
  }


  // =====================================================
  // LEGAL ORGANIZATION NAME VALIDATION
  // =====================================================

  verifyOrgNameRequired() {

    this.verifyInputFieldValidation(
      'input[name="business.legalBusinessName"]',
      'Required'
    );

    return this;
  }


  // =====================================================
  // FORMATION STATE VALIDATION
  // =====================================================

  verifyFormationStateRequired() {

    cy.contains(
      'label',
      'Formation State'
    )
      .closest('div')
      .find('small')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const actualMessage = text
          .replace(/\u00a0/g, ' ')
          .trim();

        expect(actualMessage)
          .to.equal('Required');

      });

    return this;
  }


  // =====================================================
  // INDUSTRY VALIDATION
  // =====================================================

  verifyIndustryRequired() {

    cy.contains(
      'label',
      'What industry does your Organization operate in'
    )
      .closest('div')
      .find('small')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const actualMessage = text
          .replace(/\u00a0/g, ' ')
          .trim();

        expect(actualMessage)
          .to.equal('Required');

      });

    return this;
  }


  // =====================================================
  // TAX ID FORMAT VALIDATION
  // =====================================================

  verifyTaxIdFormatValidation() {

    this.verifyInputFieldValidation(
      'input[placeholder="Enter your organization TIN"]',
      'Tax ID Number must be in the format XX-XXXXXXX'
    );

    return this;
  }


  // =====================================================
  // REGISTERED ORGANIZATION ADDRESS VALIDATION
  // =====================================================

  verifyAddressRequired() {

    this.verifyInputFieldValidation(
      'input[placeholder="Enter your company\'s registered organization  address"]',
      'Required'
    );

    return this;
  }


  // =====================================================
  // CITY VALIDATION
  // =====================================================

  verifyCityRequired() {

    this.verifyInputFieldValidation(
      'input[placeholder="Enter city"]',
      'Required'
    );

    return this;
  }


  // =====================================================
  // STATE VALIDATION
  // =====================================================

  verifyStateRequired() {

    cy.contains(
      'label',
      /^State\s*\*?$/
    )
      .should('be.visible')
      .closest('div')
      .find('small')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const actualMessage = text
          .replace(/\u00a0/g, ' ')
          .trim();

        expect(actualMessage)
          .to.equal('Required');

      });

    return this;
  }


  // =====================================================
  // POSTAL CODE VALIDATION
  // =====================================================

  verifyPostalCodeRequired() {

    this.verifyInputFieldValidation(
      'input[placeholder="Enter postal code"]',
      'Required'
    );

    return this;
  }


  // =====================================================
  // INVALID POSTAL CODE VALIDATION
  // =====================================================

  verifyPostalCodeValidation() {

    this.postalCode
      .should('be.visible')
      .closest('div')
      .find('small')
      .filter(':visible')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const actualMessage = text
          .replace(/\u00a0/g, ' ')
          .trim();

        expect(actualMessage)
          .to.equal('Invalid ZIP code.');

      });

    return this;
  }


  // =====================================================
  // ORGANIZATION EMAIL VALIDATION
  // =====================================================

  verifyEmailValidation() {

    this.verifyInputFieldValidation(
      'input[placeholder="Enter email address"]',
      'Invalid email'
    );

    return this;
  }


  // =====================================================
  // OWNERSHIP / AUTHORITY VALIDATION
  // =====================================================

  verifyOwnershipAuthorityRequired() {

    cy.contains(
      'label',
      'Yes - I am the sole owner and authorized representative'
    )
      .parents('div')
      .filter(':has(small)')
      .first()
      .find('small')
      .should('be.visible')
      .invoke('text')
      .then((text) => {

        const actualMessage = text
          .replace(/\u00a0/g, ' ')
          .trim();

        expect(actualMessage)
          .to.equal('Required');

      });

    return this;
  }


  // =====================================================
  // WEBSITE VALIDATION
  // WEBSITE IS OPTIONAL
  // =====================================================

  verifyWebsiteHasNoValidation() {

    this.website
      .should('be.visible')
      .closest('div')
      .find('small')
      .filter(':visible')
      .then(($errors) => {

        const messages = [...$errors]
          .map((element) =>
            element.innerText
              .replace(/\u00a0/g, ' ')
              .trim()
          )
          .filter(Boolean);

        expect(messages)
          .to.not.include('Required');

        expect(messages)
          .to.not.include('Invalid');

        expect(messages)
          .to.not.include('Invalid website');

      });

    return this;
  }


  // =====================================================
  // COMPLETE REQUIRED FIELD VALIDATIONS
  // =====================================================

  verifyRequiredFieldValidations() {

    this.verifyOrgNameRequired();

    this.verifyFormationStateRequired();

    this.verifyIndustryRequired();

    this.verifyAddressRequired();

    this.verifyCityRequired();

    this.verifyStateRequired();

    this.verifyPostalCodeRequired();

    this.verifyOwnershipAuthorityRequired();

    return this;
  }


  // =====================================================
  // ACTION METHODS
  // =====================================================

  enterOrgName(name) {

    this.orgname
      .clear()
      .type(name);

    return this;
  }


  selectFormationStateOption(formationstate) {

    this.selectFormationState
      .click();

    this.stateFormationOption(formationstate)
      .click();

    return this;
  }


  selectIndustryOption(industry) {

    this.selectIndustry
      .click();

    this.industryOption(industry)
      .click();

    return this;
  }


  enterWebsite(website) {

    this.website
      .clear()
      .type(website);

    return this;
  }


  enterTaxIdNumber(taxId) {

    this.taxIdnumber
      .clear()
      .type(taxId);

    return this;
  }


  enterOrgNameAddress(address) {

    this.orgAddress
      .clear()
      .type(address);

    return this;
  }


  enterCity(city) {

    this.city
      .clear()
      .type(city);

    return this;
  }


  selectStateOption(state) {

    this.selectState
      .click();

    this.stateOption(state)
      .click();

    return this;
  }


  enterPostalCode(postalcode) {

    this.postalCode
      .clear()
      .type(postalcode);

    return this;
  }


  enterOrgEmailAddress(orgemail) {

    this.orgEmailAddress
      .clear()
      .type(orgemail);

    return this;
  }


  clickSoleUserRadiobtn() {

    this.soleUserRadiobtn
      .click();

    return this;
  }


  clickNonSoleUserRadiobtn() {

    this.nonsoleUserRadiobtn
      .click();

    return this;
  }


  clickUserNextButton() {

    this.UsernextButton
      .click();

    return this;
  }

}


export default new CreateorgProfile();