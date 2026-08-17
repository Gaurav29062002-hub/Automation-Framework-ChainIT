import GetStartedPage from '../../pages/OrganizationSetup/GetstartedPage';
import CreateorgProfile from '../../pages/OrganizationSetup/CreateorgProfile';
import PromocodePage from '../../pages/OrganizationSetup/PromocodePage';
import PaymentPage from '../../pages/OrganizationSetup/PaymentPage';

import subscriptionPricing from '../../fixtures/subscriptionPricing.json';

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
  'Payment - Subscription Tier Pricing Validation',
  () => {


    // =====================================================
    // COMMON SETUP
    // =====================================================

    beforeEach(() => {

      cy.visit('/');

    });


    // =====================================================
    // COMMON ORGANIZATION FLOW
    // =====================================================

    function navigateToPaymentPage() {

      // ===================================================
      // GET STARTED
      // ===================================================

      GetStartedPage
        .clickGetStartedBtn();

      GetStartedPage
        .clickFirstCheckbox();

      GetStartedPage
        .clickSecondCheckbox();

      GetStartedPage
        .clickNextButton();


      // ===================================================
      // GENERATE RANDOM DATA
      // ===================================================

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


      // ===================================================
      // RANDOM STATE
      // ===================================================

      const randomState =
        generateRandomState();


      // ===================================================
      // ZIP CODE
      // ===================================================

      const randomZipCode =
        generateZipCodeForState(
          randomState
        );


      // ===================================================
      // RANDOM INDUSTRY
      // ===================================================

      const randomIndustry =
        generateRandomIndustry();


      // ===================================================
      // LOG TEST DATA
      // ===================================================

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


      // ===================================================
      // ORGANIZATION PROFILE
      // ===================================================

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


      // ===================================================
      // NON-SOLE USER
      // ===================================================

      CreateorgProfile
        .clickNonSoleUserRadiobtn();

      CreateorgProfile
        .clickUserNextButton();


      // ===================================================
      // PROMO CODE
      // ===================================================

      PromocodePage
        .clickContinuewithoutPromoBtn();

    }


    // =====================================================
    // E2E-018-01
    // ESSENTIAL
    // =====================================================

    it(
      'E2E-018-01 - Verify Essential subscription pricing and dynamic sales tax',
      () => {

        // -----------------------------------------------
        // Register tax API BEFORE selecting tier
        // -----------------------------------------------

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // -----------------------------------------------
        // Navigate to Payment page
        // -----------------------------------------------

        navigateToPaymentPage();


        // -----------------------------------------------
        // Select Essential
        // -----------------------------------------------

        PaymentPage
          .selectEssentialTier();


        // -----------------------------------------------
        // Select required checkboxes
        // -----------------------------------------------

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // -----------------------------------------------
        // Verify pricing
        // -----------------------------------------------

        PaymentPage
          .verifyTierPricing({
            setupFee:
              subscriptionPricing.essential.setupFee,

            subscription:
              subscriptionPricing.essential.subscription
          });

      }
    );


    // =====================================================
    // E2E-018-02
    // ADVANCED
    // =====================================================

    it(
      'E2E-018-02 - Verify Advanced subscription pricing and dynamic sales tax',
      () => {

        // -----------------------------------------------
        // Register tax API
        // -----------------------------------------------

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // -----------------------------------------------
        // Navigate to Payment page
        // -----------------------------------------------

        navigateToPaymentPage();


        // -----------------------------------------------
        // Select Advanced
        // -----------------------------------------------

        PaymentPage
          .selectAdvancedTier();


        // -----------------------------------------------
        // Select required checkboxes
        // -----------------------------------------------

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // -----------------------------------------------
        // Verify pricing
        // -----------------------------------------------

        PaymentPage
          .verifyTierPricing({
            setupFee:
              subscriptionPricing.advanced.setupFee,

            subscription:
              subscriptionPricing.advanced.subscription
          });

      }
    );


    // =====================================================
    // E2E-018-03
    // ENTERPRISE
    // =====================================================

    it(
      'E2E-018-03 - Verify Enterprise subscription pricing and dynamic sales tax',
      () => {

        // -----------------------------------------------
        // Register tax API
        // -----------------------------------------------

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // -----------------------------------------------
        // Navigate to Payment page
        // -----------------------------------------------

        navigateToPaymentPage();


        // -----------------------------------------------
        // Select Enterprise
        // -----------------------------------------------

        PaymentPage
          .selectEnterpriseTier();


        // -----------------------------------------------
        // Select required checkboxes
        // -----------------------------------------------

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // -----------------------------------------------
        // Verify pricing
        // -----------------------------------------------

        PaymentPage
          .verifyTierPricing({
            setupFee:
              subscriptionPricing.enterprise.setupFee,

            subscription:
              subscriptionPricing.enterprise.subscription
          });

      }
    );

  }
);