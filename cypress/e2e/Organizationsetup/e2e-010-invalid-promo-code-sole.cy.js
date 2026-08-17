import GetStartedPage from '../../pages/OrganizationSetup/GetStartedPage';
import CreateorgProfile from '../../pages/OrganizationSetup/CreateorgProfile';
import PromocodePage from '../../pages/OrganizationSetup/PromocodePage';

import {
  generateRandomOrgName,
  generateRandomWebsite,
  generateRandomTaxId,
  generateRandomAddress,
  generateRandomCity,
  generateRandomEmail,
  generateRandomState,
  generateZipCodeForState,
  generateRandomIndustry,
} from '../../utils/randomData';


describe('Organization Setup - E2E Flow', () => {

  beforeEach(() => {

    cy.visit('/');

  });


  it('should reject invalid 7-character promo code for sole organization', () => {

    // =====================================================
    // GET STARTED
    // =====================================================

    GetStartedPage
      .clickGetStartedBtn();

    GetStartedPage
      .clickFirstCheckbox();

    GetStartedPage
      .clickSecondCheckbox();

    GetStartedPage
      .clickNextButton();


    // =====================================================
    // GENERATE RANDOM TEST DATA
    // =====================================================

    const organizationName =
      generateRandomOrgName();

    const website =
      generateRandomWebsite();

    const taxId =
      generateRandomTaxId();

    const address =
      generateRandomAddress();

    const city =
      generateRandomCity();

    const organizationEmail =
      generateRandomEmail();


    // =====================================================
    // RANDOM STATE
    // =====================================================

    const randomState =
      generateRandomState();


    // =====================================================
    // ZIP BASED ON SAME STATE
    // =====================================================

    const randomZipCode =
      generateZipCodeForState(randomState);


    // =====================================================
    // RANDOM INDUSTRY
    // =====================================================

    const randomIndustry =
      generateRandomIndustry();


    // =====================================================
    // LOG TEST DATA
    // =====================================================

    cy.log(
      `Organization: ${organizationName}`
    );

    cy.log(
      `Formation State: ${randomState}`
    );

    cy.log(
      `State: ${randomState}`
    );

    cy.log(
      `ZIP Code: ${randomZipCode}`
    );

    cy.log(
      `Industry: ${randomIndustry}`
    );

    cy.log(
      `Organization Email: ${organizationEmail}`
    );


    // =====================================================
    // ORGANIZATION PROFILE
    // =====================================================

    CreateorgProfile
      .verifyPageLoaded();

    CreateorgProfile
      .enterOrgName(
        organizationName
      );

    CreateorgProfile
      .selectFormationStateOption(
        randomState
      );

    CreateorgProfile
      .selectIndustryOption(
        randomIndustry
      );

    CreateorgProfile
      .enterWebsite(
        website
      );

    CreateorgProfile
      .enterTaxIdNumber(
        taxId
      );

    CreateorgProfile
      .enterOrgNameAddress(
        address
      );

    CreateorgProfile
      .enterCity(
        city
      );

    CreateorgProfile
      .selectStateOption(
        randomState
      );

    CreateorgProfile
      .enterPostalCode(
        randomZipCode
      );

    CreateorgProfile
      .enterOrgEmailAddress(
        organizationEmail
      );


    // =====================================================
    // SOLE USER
    // =====================================================

    CreateorgProfile
      .clickSoleUserRadiobtn();

    CreateorgProfile
      .clickUserNextButton();


    // =====================================================
    // INVALID PROMO CODE
    // =====================================================

    const invalidPromoCode =
      'INVLD26';

    cy.log(
      `Invalid Promo Code: ${invalidPromoCode}`
    );

    expect(
      invalidPromoCode
    ).to.have.length(7);


    // =====================================================
    // ENTER INVALID PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode(
        invalidPromoCode
      );


    // =====================================================
    // CONTINUE
    // =====================================================

    PromocodePage
      .clickContinueBtn();


    // =====================================================
    // INVALID PROMO CODE VERIFICATION
    // =====================================================

    PromocodePage
      .verifyInvalidPromoCode();

  });

});