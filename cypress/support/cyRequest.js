/**
 * This method is used to intercept a request, when execute command is called, the request will be intercepted and the response will be returned
 *
 * @param {object} requestParameters - Object containing the request parameters
 * @param {string} requestParameters.method - Request method ("GET", "POST", "PUT", "PATCH", "DELETE")
 * @param {string} requestParameters.url - Request URL
 * @param {object} requestParameters.response - Request response
 * @param {number} requestParameters.status - Request status
 *
 * @param {object} execute - Object containing the command to be executed
 * @param {string} execute.name - Command to be executed ("visit", "reload", "click", "reload.click")
 * @param {string} execute.command - Command to be executed
 * @param {string} execute.click - Command to be executed after reload
 *
 * @example
 * cy.interceptRequest(
 *   {
 *     method: "GET",
 *     url: "/api/data",
 *     response: { data: "sample response" },
 *     status: 200,
 *   },
 *   { name: "visit", command: "/dashboard" }
 * );
 *
 */
Cypress.Commands.add("interceptRequest", (requestParameters, execute) => {
  cy.intercept(requestParameters.method, requestParameters.url, {
    body: requestParameters.response,
    statusCode: requestParameters.status,
  }).as("requestIntercepted");

  switch (execute.name) {
    case "visit":
      cy.visit(execute.command);
      break;

    case "reload":
      cy.reload();
      break;

    case "click":
      cy.get(execute.command).click();
      break;

    case "reload.click":
      cy.reload().then(() => {
        cy.get(execute.click).click();
      });
      break;

    default:
      break;
  }

  cy.wait("@requestIntercepted");
});
