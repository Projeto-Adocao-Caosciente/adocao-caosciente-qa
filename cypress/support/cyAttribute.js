Cypress.Commands.add(
  "validateAttribute",
  (
    element,
    attribute,
    expectedValue,
    isBoolean = false,
    customSuccessMessage,
    customFailureMessage,
    timeout = 5000
  ) => {
    cy.get(element, { timeout: timeout })
      .should(($element) => {
        let actualValue = $element.attr(attribute);
        
        if (isBoolean) {
          actualValue = actualValue === "true" ? true : false;
        }

        const elementHasAttribute = actualValue == expectedValue ? customSuccessMessage : customFailureMessage;
        expect(actualValue).to.eq(expectedValue, elementHasAttribute);
      });
  }
);
