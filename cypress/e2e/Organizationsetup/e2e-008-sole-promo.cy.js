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


  it('should create sole organization with valid promo code', () => {

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

    cy.log(`Organization: ${organizationName}`);
    cy.log(`Formation State: ${randomState}`);
    cy.log(`State: ${randomState}`);
    cy.log(`ZIP Code: ${randomZipCode}`);
    cy.log(`Industry: ${randomIndustry}`);
    cy.log(`Organization Email: ${organizationEmail}`);


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
    // PROMO CODE
    // =====================================================

    PromocodePage
      .enterPromoCode('CHAIN26');

    PromocodePage
      .clickContinueBtn();


    // =====================================================
    // SUCCESS VERIFICATION
    // =====================================================

    PromocodePage
      .verifyPromoCodeSuccess();

  });

});