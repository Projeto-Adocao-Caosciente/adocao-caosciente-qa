/**
 * Custom Cypress command to retrieve and return the text content of an element. To get the text value, you need to use await promisify().
 *
 * @param {string} element - The CSS selector or Cypress chain of the element.
 * @param {number} [timeout=5000] - Optional timeout for the command.
 * @returns {Cypress.Chainable} - A chainable object representing the Cypress command.
 *
 * @example
 * // Retrieve the text of an element with a default timeout of 5 seconds.
 * cy.getText(".my-element").should("eq", "Expected Text");
 *
 * // Retrieve the text of an element with a custom timeout.
 * cy.getText(".my-element", 10000).should("eq", "Expected Text");
 */
Cypress.Commands.add("getText", (element, timeout = 5000) => {
    cy.get(element).invoke("text").then((text) => {
        const textValue = text.trim();
        cy.wrap(textValue).as("textValue");
    });

    return cy.get("@textValue", { timeout: timeout });
});

/**
 * Custom Cypress command to retrieve and return the value content of an element. To get the value, you need to use await promisify().
 *
 * @param {string} element - The CSS selector or Cypress chain of the element.
 * @param {number} [timeout=5000] - Optional timeout for the command.
 * @returns {Cypress.Chainable} - A chainable object representing the Cypress command.
 *
 * @example
 * // Retrieve the value of an element with a default timeout of 5 seconds.
 * cy.getValue(".my-element").should("eq", "Expected Value");
 *
 * // Retrieve the value of an element with a custom timeout.
 * cy.getValue(".my-element", 10000).should("eq", "Expected Value");
 */
Cypress.Commands.add("getValue", (element, timeout = 5000) => {
    cy.get(element).invoke("val").then((text) => {
        const textValue = text.trim();
        cy.wrap(textValue).as("textValue");
    });

    return cy.get("@textValue", { timeout: timeout });
});

/**
 * Custom Cypress command to retrieve and return the value content of an input element. To get the value, you need to use await promisify().
 * This command is useful when the input element has the readonly attribute.
 * 
 * @param {string} element - The CSS selector or Cypress chain of the element.
 * @param {number} [timeout=5000] - Optional timeout for the command.
 * @returns {Cypress.Chainable} - A chainable object representing the Cypress command.
 * 
 * @example
 * // Retrieve the value of an input element with a default timeout of 5 seconds.
 * cy.getInputValue(".my-input").should("eq", "Expected Value");
 * 
 * // Retrieve the value of an input element with a custom timeout.
 * cy.getInputValue(".my-input", 10000).should("eq", "Expected Value");
 */
Cypress.Commands.add("getInputValue", (element, timeout = 5000) => {
    cy.get(element).invoke("removeAttr", "readonly").invoke("val").then((text) => {
        const textValue = text.trim();
        cy.wrap(textValue).as("textValue");
    });

    return cy.get("@textValue", { timeout: timeout });
})

/**
 * Custom Cypress command to retrieve and return the size (length) of a list of elements. To get the text value, you need to use await promisify().
 *
 * @param {string} element - The CSS selector or Cypress chain of the list of elements.
 * @param {number} [timeout=5000] - Optional timeout for the command.
 * @returns {Cypress.Chainable} - A chainable object representing the Cypress command.
 *
 * @example
 * // Retrieve the size of a list of elements with a default timeout of 5 seconds.
 * cy.getSizeList(".my-list").should("eq", expectedSize);
 *
 * // Retrieve the size of a list of elements with a custom timeout.
 * cy.getSizeList(".my-list", 10000).should("eq", expectedSize);
 */
Cypress.Commands.add("getListSize", (element, timeout = 5000) => {
    cy.get(element).then(($list) => {
        const listSize = $list.length;
        cy.wrap(listSize).as("listSize");
    });

    return cy.get("@listSize", { timeout: timeout });
});