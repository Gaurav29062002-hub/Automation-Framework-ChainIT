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
    // E2E-018-01
    // ESSENTIAL + NON-SOLE USER
    // =====================================================

    it(
      'E2E-018-01 - Verify Essential subscription pricing and dynamic sales tax - Non-Sole User',
      () => {

        // =================================================
        // REGISTER TAX API
        // =================================================

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // =================================================
        // GET STARTED
        // =================================================

        GetStartedPage
          .clickGetStartedBtn();

        GetStartedPage
          .clickFirstCheckbox();

        GetStartedPage
          .clickSecondCheckbox();

        GetStartedPage
          .clickNextButton();


        // =================================================
        // GENERATE RANDOM DATA
        // =================================================

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
          generateZipCodeForState(
            randomState
          );

        const randomIndustry =
          generateRandomIndustry();


        // =================================================
        // LOG TEST DATA
        // =================================================

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


        // =================================================
        // ORGANIZATION PROFILE
        // =================================================

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


        // =================================================
        // NON-SOLE USER
        // =================================================

        CreateorgProfile
          .clickNonSoleUserRadiobtn();

        CreateorgProfile
          .clickUserNextButton();


        // =================================================
        // PROMO CODE
        // =================================================

        PromocodePage
          .clickContinuewithoutPromoBtn();


        // =================================================
        // SELECT ESSENTIAL
        // =================================================

        PaymentPage
          .selectEssentialTier();


        // =================================================
        // SELECT REQUIRED CHECKBOXES
        // =================================================

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // =================================================
        // VERIFY PRICING
        // =================================================

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
    // ADVANCED + NON-SOLE USER
    // =====================================================

    it(
      'E2E-018-02 - Verify Advanced subscription pricing and dynamic sales tax - Non-Sole User',
      () => {

        // =================================================
        // REGISTER TAX API
        // =================================================

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // =================================================
        // GET STARTED
        // =================================================

        GetStartedPage
          .clickGetStartedBtn();

        GetStartedPage
          .clickFirstCheckbox();

        GetStartedPage
          .clickSecondCheckbox();

        GetStartedPage
          .clickNextButton();


        // =================================================
        // GENERATE RANDOM DATA
        // =================================================

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
          generateZipCodeForState(
            randomState
          );

        const randomIndustry =
          generateRandomIndustry();


        // =================================================
        // LOG TEST DATA
        // =================================================

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


        // =================================================
        // ORGANIZATION PROFILE
        // =================================================

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


        // =================================================
        // NON-SOLE USER
        // =================================================

        CreateorgProfile
          .clickNonSoleUserRadiobtn();

        CreateorgProfile
          .clickUserNextButton();


        // =================================================
        // PROMO CODE
        // =================================================

        PromocodePage
          .clickContinuewithoutPromoBtn();


        // =================================================
        // SELECT ADVANCED
        // =================================================

        PaymentPage
          .selectAdvancedTier();


        // =================================================
        // SELECT REQUIRED CHECKBOXES
        // =================================================

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // =================================================
        // VERIFY PRICING
        // =================================================

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
    // ENTERPRISE + NON-SOLE USER
    // =====================================================

    it(
      'E2E-018-03 - Verify Enterprise subscription pricing and dynamic sales tax - Non-Sole User',
      () => {

        // =================================================
        // REGISTER TAX API
        // =================================================

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // =================================================
        // GET STARTED
        // =================================================

        GetStartedPage
          .clickGetStartedBtn();

        GetStartedPage
          .clickFirstCheckbox();

        GetStartedPage
          .clickSecondCheckbox();

        GetStartedPage
          .clickNextButton();


        // =================================================
        // GENERATE RANDOM DATA
        // =================================================

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
          generateZipCodeForState(
            randomState
          );

        const randomIndustry =
          generateRandomIndustry();


        // =================================================
        // LOG TEST DATA
        // =================================================

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


        // =================================================
        // ORGANIZATION PROFILE
        // =================================================

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


        // =================================================
        // NON-SOLE USER
        // =================================================

        CreateorgProfile
          .clickNonSoleUserRadiobtn();

        CreateorgProfile
          .clickUserNextButton();


        // =================================================
        // PROMO CODE
        // =================================================

        PromocodePage
          .clickContinuewithoutPromoBtn();


        // =================================================
        // SELECT ENTERPRISE
        // =================================================

        PaymentPage
          .selectEnterpriseTier();


        // =================================================
        // SELECT REQUIRED CHECKBOXES
        // =================================================

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // =================================================
        // VERIFY PRICING
        // =================================================

        PaymentPage
          .verifyTierPricing({
            setupFee:
              subscriptionPricing.enterprise.setupFee,

            subscription:
              subscriptionPricing.enterprise.subscription
          });

      }
    );


    // =====================================================
    // E2E-018-04
    // ESSENTIAL + SOLE USER
    // =====================================================

    it(
      'E2E-018-04 - Verify Essential subscription pricing and dynamic sales tax - Sole User',
      () => {

        // =================================================
        // REGISTER TAX API
        // =================================================

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // =================================================
        // GET STARTED
        // =================================================

        GetStartedPage
          .clickGetStartedBtn();

        GetStartedPage
          .clickFirstCheckbox();

        GetStartedPage
          .clickSecondCheckbox();

        GetStartedPage
          .clickNextButton();


        // =================================================
        // GENERATE RANDOM DATA
        // =================================================

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
          generateZipCodeForState(
            randomState
          );

        const randomIndustry =
          generateRandomIndustry();


        // =================================================
        // LOG TEST DATA
        // =================================================

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


        // =================================================
        // ORGANIZATION PROFILE
        // =================================================

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


        // =================================================
        // SOLE USER
        // =================================================

        CreateorgProfile
          .clickSoleUserRadiobtn();

        CreateorgProfile
          .clickUserNextButton();


        // =================================================
        // PROMO CODE
        // =================================================

        PromocodePage
          .clickContinuewithoutPromoBtn();


        // =================================================
        // SELECT ESSENTIAL
        // =================================================

        PaymentPage
          .selectEssentialTier();


        // =================================================
        // SELECT REQUIRED CHECKBOXES
        // =================================================

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // =================================================
        // VERIFY PRICING
        // =================================================

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
    // E2E-018-05
    // ADVANCED + SOLE USER
    // =====================================================

    it(
      'E2E-018-05 - Verify Advanced subscription pricing and dynamic sales tax - Sole User',
      () => {

        // =================================================
        // REGISTER TAX API
        // =================================================

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // =================================================
        // GET STARTED
        // =================================================

        GetStartedPage
          .clickGetStartedBtn();

        GetStartedPage
          .clickFirstCheckbox();

        GetStartedPage
          .clickSecondCheckbox();

        GetStartedPage
          .clickNextButton();


        // =================================================
        // GENERATE RANDOM DATA
        // =================================================

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
          generateZipCodeForState(
            randomState
          );

        const randomIndustry =
          generateRandomIndustry();


        // =================================================
        // LOG TEST DATA
        // =================================================

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


        // =================================================
        // ORGANIZATION PROFILE
        // =================================================

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


        // =================================================
        // SOLE USER
        // =================================================

        CreateorgProfile
          .clickSoleUserRadiobtn();

        CreateorgProfile
          .clickUserNextButton();


        // =================================================
        // PROMO CODE
        // =================================================

        PromocodePage
          .clickContinuewithoutPromoBtn();


        // =================================================
        // SELECT ADVANCED
        // =================================================

        PaymentPage
          .selectAdvancedTier();


        // =================================================
        // SELECT REQUIRED CHECKBOXES
        // =================================================

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // =================================================
        // VERIFY PRICING
        // =================================================

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
    // E2E-018-06
    // ENTERPRISE + SOLE USER
    // =====================================================

    it(
      'E2E-018-06 - Verify Enterprise subscription pricing and dynamic sales tax - Sole User',
      () => {

        // =================================================
        // REGISTER TAX API
        // =================================================

        cy.intercept(
          'POST',
          '**/tax/v2/calculate-ephemeral-tax'
        ).as('calculateTax');


        // =================================================
        // GET STARTED
        // =================================================

        GetStartedPage
          .clickGetStartedBtn();

        GetStartedPage
          .clickFirstCheckbox();

        GetStartedPage
          .clickSecondCheckbox();

        GetStartedPage
          .clickNextButton();


        // =================================================
        // GENERATE RANDOM DATA
        // =================================================

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
          generateZipCodeForState(
            randomState
          );

        const randomIndustry =
          generateRandomIndustry();


        // =================================================
        // LOG TEST DATA
        // =================================================

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


        // =================================================
        // ORGANIZATION PROFILE
        // =================================================

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


        // =================================================
        // SOLE USER
        // =================================================

        CreateorgProfile
          .clickSoleUserRadiobtn();

        CreateorgProfile
          .clickUserNextButton();


        // =================================================
        // PROMO CODE
        // =================================================

        PromocodePage
          .clickContinuewithoutPromoBtn();


        // =================================================
        // SELECT ENTERPRISE
        // =================================================

        PaymentPage
          .selectEnterpriseTier();


        // =================================================
        // SELECT REQUIRED CHECKBOXES
        // =================================================

        PaymentPage
          .selectFirstCheckbox();

        PaymentPage
          .selectSecondCheckbox();


        // =================================================
        // VERIFY PRICING
        // =================================================

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