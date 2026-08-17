import GetStartedPage from '../../pages/OrganizationSetup/GetstartedPage';
import CreateorgProfile from '../../pages/OrganizationSetup/CreateorgProfile';

import {
  generateRandomOrgName,
  generateRandomWebsite,
  generateRandomTaxId,
  generateRandomAddress,
  generateRandomCity,
  generateRandomEmail,
  generateRandomState,
  generateRandomIndustry,
} from '../../utils/randomData';


describe('E2E-017 - Create Organization Profile - Invalid Postal Code', () => {

  beforeEach(() => {

    cy.visit('/');

  });


  it('should display validation error when postal code is not 5 digits', () => {

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
      generateRandomTaxId();

    const address =
      generateRandomAddress();

    const city =
      generateRandomCity();

    const organizationEmail =
      generateRandomEmail();

    const randomState =
      generateRandomState();

    const randomIndustry =
      generateRandomIndustry();


    // =====================================================
    // LOG TEST DATA
    // =====================================================

    cy.log(`Organization: ${organizationName}`);
    cy.log(`Formation State: ${randomState}`);
    cy.log(`Industry: ${randomIndustry}`);
    cy.log(`Organization Email: ${organizationEmail}`);
    cy.log(`Invalid Postal Code: 1234`);


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
        taxId
      );


    // =====================================================
    // VALID ADDRESS
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


    // =====================================================
    // INVALID POSTAL CODE
    // =====================================================

    CreateorgProfile
      .enterPostalCode(
        '1234'
      );


    // =====================================================
    // VALID ORGANIZATION EMAIL
    // =====================================================

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
    // VERIFY POSTAL CODE VALIDATION
    // =====================================================

    CreateorgProfile
      .verifyPostalCodeValidation();

  });

});