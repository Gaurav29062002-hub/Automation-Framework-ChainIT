import GetStartedPage from '../../pages/OrganizationSetup/GetStartedPage';
import CreateorgProfile from '../../pages/OrganizationSetup/CreateorgProfile';


describe('Organization Setup - E2E-014 - Empty Organization Profile Validation', () => {

  beforeEach(() => {

    cy.visit('/');

  });


  it('should display validation messages when organization profile is submitted empty', () => {

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
    // VERIFY CREATE ORGANIZATION PROFILE PAGE
    // =====================================================

    CreateorgProfile
      .verifyPageLoaded();


    // =====================================================
    // SUBMIT EMPTY FORM
    // =====================================================

    CreateorgProfile
      .clickUserNextButton();


    // =====================================================
    // VERIFY REQUIRED VALIDATIONS
    // =====================================================

    CreateorgProfile
      .verifyRequiredFieldValidations();


    // =====================================================
    // VERIFY TAX ID VALIDATION
    // =====================================================

    CreateorgProfile
      .verifyTaxIdFormatValidation();


    // =====================================================
    // VERIFY EMAIL VALIDATION
    // =====================================================

    CreateorgProfile
      .verifyEmailValidation();


    // =====================================================
    // VERIFY WEBSITE IS OPTIONAL
    // =====================================================

    CreateorgProfile
      .verifyWebsiteHasNoValidation();


    // =====================================================
    // VERIFY USER REMAINS ON PROFILE PAGE
    // =====================================================

    CreateorgProfile
      .verifyPageLoaded();

  });

});