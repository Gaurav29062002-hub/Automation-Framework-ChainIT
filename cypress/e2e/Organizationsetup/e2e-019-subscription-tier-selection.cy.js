import GetStartedPage from '../../pages/OrganizationSetup/GetStartedPage';
import CreateorgProfile from '../../pages/OrganizationSetup/CreateorgProfile';
import PromocodePage from '../../pages/OrganizationSetup/PromocodePage';
import PaymentPage from '../../pages/OrganizationSetup/PaymentPage';

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


describe(
  'Payment - Subscription Tier Selection',
  () => {


    beforeEach(() => {

      cy.visit('/');

    });


    it(
      'E2E-019 - Verify subscription tier selection and switching',
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
          generateZipCodeForState(
            randomState
          );


        // =====================================================
        // RANDOM INDUSTRY
        // =====================================================

        const randomIndustry =
          generateRandomIndustry();


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
        // PROMO CODE
        // =====================================================

        PromocodePage
          .clickContinuewithoutPromoBtn();


        // =====================================================
        // VERIFY PAYMENT PAGE
        // =====================================================

        PaymentPage
          .selectEssentialTier();


        // =====================================================
// VERIFY ESSENTIAL
// =====================================================

PaymentPage
  .selectEssentialTier();

PaymentPage
  .verifyEssentialTierSelected();

PaymentPage
  .verifyOnlyOneTierSelected();


// =====================================================
// SWITCH TO ENTERPRISE
// =====================================================

PaymentPage
  .selectEnterpriseTier();

PaymentPage
  .verifyEnterpriseTierSelected();

PaymentPage
  .verifyOnlyOneTierSelected();

PaymentPage
  .verifyTierNotSelected('Essential');


// =====================================================
// SWITCH TO ADVANCED
// =====================================================

PaymentPage
  .selectAdvancedTier();

PaymentPage
  .verifyAdvancedTierSelected();

PaymentPage
  .verifyOnlyOneTierSelected();

PaymentPage
  .verifyTierNotSelected('Enterprise');

      }
    );

  }
);