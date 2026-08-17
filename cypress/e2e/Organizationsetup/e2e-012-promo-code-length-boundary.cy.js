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


  // =====================================================
  // COMMON ORGANIZATION PROFILE FLOW
  // =====================================================

  const completeOrganizationProfile = (userType) => {

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

    const randomState =
      generateRandomState();

    const randomZipCode =
      generateZipCodeForState(randomState);

    const randomIndustry =
      generateRandomIndustry();


    // =====================================================
    // LOG TEST DATA
    // =====================================================

    cy.log(
      `Organization: ${organizationName}`
    );

    cy.log(
      `User Type: ${userType}`
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
    // USER TYPE
    // =====================================================

    if (userType === 'sole') {

      CreateorgProfile
        .clickSoleUserRadiobtn();

    } else {

      CreateorgProfile
        .clickNonSoleUserRadiobtn();

    }


    CreateorgProfile
      .clickUserNextButton();

  };


  // =====================================================
  // SCENARIO 1
  // SOLE USER + 6 CHARACTERS
  // =====================================================

  it('should reject 6-character promo code for sole user', () => {

    completeOrganizationProfile('sole');


    const shortPromoCode = 'CHAIN2';


    cy.log(
      `Promo Code: ${shortPromoCode}`
    );

    cy.log(
      `Promo Code Length: ${shortPromoCode.length}`
    );


    // =====================================================
    // ENTER 6 CHARACTER PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode(
        shortPromoCode
      );


    // =====================================================
    // VERIFY ENTERED VALUE
    // =====================================================

    PromocodePage
      .promoCodeInput
      .should(
        'have.value',
        shortPromoCode
      );

    // =====================================================
    // VERIFY VALIDATION ERROR
    // =====================================================

    PromocodePage
      .verifyPromoCodeLengthError();

  });


  // =====================================================
  // SCENARIO 2
  // SOLE USER + 8 CHARACTERS
  // =====================================================

  it('should reject 8-character promo code for sole user', () => {

    completeOrganizationProfile('sole');


    const longPromoCode = 'CHAIN2601';


    cy.log(
      `Promo Code: ${longPromoCode}`
    );

    cy.log(
      `Promo Code Length: ${longPromoCode.length}`
    );


    // =====================================================
    // ENTER 8 CHARACTER PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode(
        longPromoCode
      );


    // =====================================================
    // VERIFY ENTERED VALUE
    // =====================================================

    PromocodePage
      .promoCodeInput
      .should(
        'have.value',
        longPromoCode
      );

    // =====================================================
    // VERIFY VALIDATION ERROR
    // =====================================================

    PromocodePage
      .verifyPromoCodeLengthError();

  });


  // =====================================================
  // SCENARIO 3
  // NON-SOLE USER + 6 CHARACTERS
  // =====================================================

  it('should reject 6-character promo code for non-sole user', () => {

    completeOrganizationProfile('nonSole');


    const shortPromoCode = 'CHAIN2';


    cy.log(
      `Promo Code: ${shortPromoCode}`
    );

    cy.log(
      `Promo Code Length: ${shortPromoCode.length}`
    );


    // =====================================================
    // ENTER 6 CHARACTER PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode(
        shortPromoCode
      );


    // =====================================================
    // VERIFY ENTERED VALUE
    // =====================================================

    PromocodePage
      .promoCodeInput
      .should(
        'have.value',
        shortPromoCode
      );


    // =====================================================
    // VERIFY VALIDATION ERROR
    // =====================================================

    PromocodePage
      .verifyPromoCodeLengthError();

  });


  // =====================================================
  // SCENARIO 4
  // NON-SOLE USER + 8 CHARACTERS
  // =====================================================

  it('should reject 8-character promo code for non-sole user', () => {

    completeOrganizationProfile('nonSole');


    const longPromoCode = 'CHAIN2601';


    cy.log(
      `Promo Code: ${longPromoCode}`
    );

    cy.log(
      `Promo Code Length: ${longPromoCode.length}`
    );


    // =====================================================
    // ENTER 8 CHARACTER PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode(
        longPromoCode
      );


    // =====================================================
    // VERIFY ENTERED VALUE
    // =====================================================

    PromocodePage
      .promoCodeInput
      .should(
        'have.value',
        longPromoCode
      );

    // =====================================================
    // VERIFY VALIDATION ERROR
    // =====================================================

    PromocodePage
      .verifyPromoCodeLengthError();

  });

});