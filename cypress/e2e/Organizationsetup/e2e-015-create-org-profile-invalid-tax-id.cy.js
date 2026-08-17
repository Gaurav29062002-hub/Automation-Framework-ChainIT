import GetStartedPage from '../../pages/OrganizationSetup/GetStartedPage';
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


describe('E2E-015 - Create Organization Profile - Invalid Tax ID', () => {

  beforeEach(() => {

    cy.visit('/');

  });


  it('should display validation error when Tax ID contains invalid characters', () => {

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
    cy.log(`Formation State: ${randomState}`);
    cy.log(`Industry: ${randomIndustry}`);
    cy.log(`Organization Email: ${organizationEmail}`);
    cy.log(`Invalid Tax ID: as-dfhjklo`);


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
    // INVALID TAX ID
    // =====================================================

    CreateorgProfile
      .enterTaxIdNumber(
        'as-dfhjklo'
      );


    // =====================================================
    // REMAINING VALID FIELDS
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

    CreateorgProfile
      .enterOrgEmailAddress(
        organizationEmail
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
    // VERIFY TAX ID VALIDATION
    // =====================================================

    CreateorgProfile
      .verifyTaxIdFormatValidation();

  });

});