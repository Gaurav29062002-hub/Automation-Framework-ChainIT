import GetStartedPage from '../../pages/OrganizationSetup/GetStartedPage';
import CreateorgProfile from '../../pages/OrganizationSetup/CreateorgProfile';
import PromocodePage from '../../pages/OrganizationSetup/PromocodePage';
import PaymentPage from '../../pages/OrganizationSetup/PaymentPage';

import paymentData from '../../fixtures/paymentData.json';

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


  it('should create organization with non-sole user and Advanced subscription', () => {

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


    // Formation State
    CreateorgProfile
      .selectFormationStateOption(
        randomState
      );


    // Random Industry
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


    // State
    // Same value as Formation State
    CreateorgProfile
      .selectStateOption(
        randomState
      );


    // ZIP
    // ZIP belongs to selected state
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
    // SUBSCRIPTION
    // =====================================================

    PaymentPage
      .selectAdvancedTier();

    PaymentPage
      .selectFirstCheckbox();

    PaymentPage
      .selectSecondCheckbox();


    // =====================================================
// PAYMENT IFRAME
// =====================================================

PaymentPage
  .waitForPaymentIframe();


// =====================================================
// PAYMENT DETAILS
// =====================================================

PaymentPage
  .enterCardholderName(
    paymentData.cardholderName
  );

PaymentPage
  .enterCardNumber(
    paymentData.cardNumber
  );

PaymentPage
  .enterExpiryMonth(
    paymentData.expiryMonth
  );

PaymentPage
  .enterExpiryYear(
    paymentData.expiryYear
  );

PaymentPage
  .enterCVV(
    paymentData.cvv
  );

PaymentPage
  .enterZipCode(
    paymentData.zipCode
  );


// =====================================================
// PAY NOW
// =====================================================

PaymentPage
  .clickPayNow();


// =====================================================
// SUCCESS VERIFICATION
// =====================================================

PaymentPage
  .verifyOnboardingSuccess();

  });

});