import GetStartedPage from '../../pages/OrganizationSetup/GetstartedPage';
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
  // SOLE USER + SPECIAL CHARACTERS
  // =====================================================

  it('should reject non-alphanumeric promo code for sole user', () => {

    completeOrganizationProfile('sole');


    const specialCharacterPromoCode =
      '@#$%^&*';


    cy.log(
      `Promo Code: ${specialCharacterPromoCode}`
    );

    cy.log(
      `Promo Code Length: ${specialCharacterPromoCode.length}`
    );


    // =====================================================
    // ENTER SPECIAL CHARACTER PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode(
        specialCharacterPromoCode
      );


    // =====================================================
    // VERIFY ENTERED VALUE
    // =====================================================

    PromocodePage
      .promoCodeInput
      .should(
        'have.value',
        specialCharacterPromoCode
      );

    // =====================================================
    // VERIFY ALPHANUMERIC VALIDATION
    // =====================================================

    PromocodePage
      .verifyPromoCodeAlphanumericError();

  });


  // =====================================================
  // SCENARIO 2
  // NON-SOLE USER + SPECIAL CHARACTERS
  // =====================================================

  it('should reject non-alphanumeric promo code for non-sole user', () => {

    completeOrganizationProfile('nonSole');


    const specialCharacterPromoCode =
      '@#$%^&*';


    cy.log(
      `Promo Code: ${specialCharacterPromoCode}`
    );

    cy.log(
      `Promo Code Length: ${specialCharacterPromoCode.length}`
    );


    // =====================================================
    // ENTER SPECIAL CHARACTER PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode(
        specialCharacterPromoCode
      );


    // =====================================================
    // VERIFY ENTERED VALUE
    // =====================================================

    PromocodePage
      .promoCodeInput
      .should(
        'have.value',
        specialCharacterPromoCode
      );

    // =====================================================
    // VERIFY ALPHANUMERIC VALIDATION
    // =====================================================

    PromocodePage
      .verifyPromoCodeAlphanumericError();

  });

});