beforeEach(() => {
  cy.log('Test started');
});

afterEach(() => {
  cy.log('Test finished');
});

Cypress.on('uncaught:exception', (err) => {

  if (
    err.message.includes(
      "Cannot read properties of null (reading 'enableSubmitButton')"
    ) &&
    err.stack?.includes(
      'QorPaymentForm.paymentSubmittedCallback'
    )
  ) {
    return false;
  }

});