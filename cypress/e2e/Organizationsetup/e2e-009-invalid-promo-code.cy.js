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


describe('Organization Setup - E2E-009 Invalid Promo Code', () => {

  beforeEach(() => {

    cy.visit('/');

  });


  it(
    'should reject invalid 7-character promo code for non-sole organization',
    () => {

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
      // RANDOM TEST DATA
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

      cy.log(`Organization: ${organizationName}`);
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
      // NON-SOLE USER
      // =====================================================

      CreateorgProfile
        .clickNonSoleUserRadiobtn();

      CreateorgProfile
        .clickUserNextButton();


      // =====================================================
      // INVALID PROMO CODE
      // =====================================================

      const invalidPromoCode = 'INVLD26';

      cy.log(
        `Invalid Promo Code: ${invalidPromoCode}`
      );

      // Verify exactly 7 characters
      expect(
        invalidPromoCode
      ).to.have.length(7);


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

    }
  );

});