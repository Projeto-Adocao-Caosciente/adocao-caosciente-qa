Cypress.Commands.add(
  "validateAttribute",
  (
    element,
    attribute,
    expectedValue,
    customSuccessMessage,
    customFailureMessage,
    timeout = 5000
  ) => {
    switch (attribute) {
      case "aria-invalid":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const actualValue = Boolean($element.attr(attribute));

          const elementHasAttribute = actualValue == expectedValue
              ? customSuccessMessage
              : customFailureMessage;
          expect(actualValue).to.eq(expectedValue, elementHasAttribute);
        });
        break;

      case "type":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const actualValue = $element.attr(attribute);

          const elementHasAttribute = actualValue == expectedValue
              ? customSuccessMessage
              : customFailureMessage;
          expect(actualValue).to.eq(expectedValue, elementHasAttribute);
        });
        break;

      case "data-disabled":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const actualValue = Boolean($element.attr(attribute));

          const elementHasAttribute = actualValue == expectedValue
              ? customSuccessMessage
              : customFailureMessage;
          expect(actualValue).to.eq(expectedValue, elementHasAttribute);
        });
        break;

      default:
        break;
    }
  }
);
