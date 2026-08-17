import GetStartedPage from '../../pages/OrganizationSetup/GetstartedPage';
import CreateorgProfile from '../../pages/OrganizationSetup/CreateorgProfile';

import {
  generateRandomOrgName,
  generateRandomWebsite,
  generateRandomAddress,
  generateRandomCity,
  generateRandomEmail,
  generateRandomState,
  generateZipCodeForState,
  generateRandomIndustry,
} from '../../utils/randomData';


describe('E2E-016 - Create Organization Profile - Invalid Email', () => {

  beforeEach(() => {

    cy.visit('/');

  });


  it('should display validation error for invalid organization email', () => {

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
    // GENERATE TEST DATA
    // =====================================================

    const organizationName =
      generateRandomOrgName();

    const website =
      generateRandomWebsite();

    const taxId =
      generateRandomEmail();

    const address =
      generateRandomAddress();

    const city =
      generateRandomCity();

    const validOrganizationEmail =
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
    cy.log(`Formation State: ${randomState}`);
    cy.log(`Industry: ${randomIndustry}`);
    cy.log(`Invalid Email: test@`);


    // =====================================================
    // VERIFY PAGE
    // =====================================================

    CreateorgProfile
      .verifyPageLoaded();


    // =====================================================
    // ORGANIZATION PROFILE
    // =====================================================

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


    // =====================================================
    // VALID TAX ID
    // =====================================================

    CreateorgProfile
      .enterTaxIdNumber(
        '12-3456789'
      );


    // =====================================================
    // ADDRESS
    // =====================================================

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


    // =====================================================
    // INVALID ORGANIZATION EMAIL
    // =====================================================

    CreateorgProfile
      .enterOrgEmailAddress(
        'test@'
      );


    // =====================================================
    // SOLE USER
    // =====================================================

    CreateorgProfile
      .clickSoleUserRadiobtn();


    // =====================================================
    // CLICK NEXT
    // =====================================================

    CreateorgProfile
      .clickUserNextButton();


    // =====================================================
    // VERIFY EMAIL VALIDATION
    // =====================================================

    CreateorgProfile
      .verifyEmailValidation();

  });

});