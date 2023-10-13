/**
 * Asynchronously retrieves the value of a DOM element after waiting for it to have a non-empty value.
 *
 * @param {string} element - CSS selector of the element to retrieve value from.
 * @param {number} timeout - Maximum time (in ms) to wait for the element to have a non-empty value.
 *
 * @returns {Promise<string>|null} - Returns the value of the element or null if the timeout is exceeded.
 *
 * @example
 * const retrievedValue = await getValue('.my-element', 3000);
 * if (retrievedValue !== null) {
 *   console.log(`Retrieved value: ${retrievedValue}`);
 * } else {
 *   console.error("Timeout exceeded while retrieving value.");
 * }
 */
async function getValue(element, intervalTime = 50, timeout = 5000) {
  const checkCondition = new Promise((resolve, reject) => {
    const interval = intervalTime;
    let elapsedSeconds = 0;

    const checkValue = async () => {
      const value = await Cypress.$(element).text().trim();
      //const value = await promisify(cy.get(element).invoke('text').then((text) => text.trim()));

      if (value !== "") {
        clearInterval(intervalId);
        resolve(value);
      } else if (elapsedSeconds >= timeout) {
        clearInterval(intervalId);
        reject("Timeout exceeded");
      } else {
        elapsedSeconds += interval / 1000;
      }
    };

    const intervalId = setInterval(checkValue, interval);
  });

  return await checkCondition
    .then((value) => {
      return value;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

/**
 * Asynchronously retrieves the size of a DOM element after waiting for it to have a non-empty value.
 *
 * @param {string} element - CSS selector of the element to retrieve value from.
 * @param {number} timeout - Maximum time (in ms) to wait for the element to have a non-empty value.
 *
 * @returns {Promise<number>|null} - Returns the size of the element or null if the timeout is exceeded.
 *
 * @example
 * const retrievedSize = await getSize('.my-element', 3000);
 * if (retrievedSize !== null) {
 *  console.log(`Retrieved size: ${retrievedSize}`);
 * } else {
 * console.error("Timeout exceeded while retrieving size.");
 * }
 *
 */
async function getSize(element, timeout = 5000) {
  const checkCondition = new Promise((resolve, reject) => {
    const interval = 500;
    let elapsedSeconds = 0;

    const checkValue = async () => {
      const value = await Cypress.$(element).length;

      if (value !== undefined) {
        clearInterval(intervalId);
        resolve(value);
      } else if (elapsedSeconds >= timeout) {
        clearInterval(intervalId);
        reject("Timeout exceeded");
      } else {
        elapsedSeconds += interval / 1000;
      }
    };

    const intervalId = setInterval(checkValue, interval);
  });

  return await checkCondition
    .then((value) => {
      return value;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

/**
 * Performs assertions on a given value based on the specified criteria.
 *
 * @param {any} value - The value to perform assertions on.
 * @param {string} assert - The assertion to be performed ("equal", "not.equal", "not.null", "contains", "not.contains").
 * @param {any} expected - The expected value for comparison.
 * @param {string} customSuccessMessage - Custom success message.
 * @param {string} customFailureMessage - Custom failure message.
 * @returns {void}
 * @example
 * expected(
 *   10,
 *   "equal",
 *   10,
 *   "Expected value is equal.",
 *   "Expected value is not equal."
 * );
 */

function expected(
  value,
  assert,
  expected,
  customSuccessMessage,
  customFailureMessage
) {
  let customMessage;

  switch (assert) {
    case "equal":
      value === expected
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.equal(expected, customMessage);
      break;

    case "greaterThan":
      value > expected
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.be.greaterThan(expected, customMessage);
      break;

    case "greaterThanOrEqual":
      value >= expected
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.be.at.least(expected, customMessage);
      break;

    case "lessThan":
      value < expected
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.be.lessThan(expected, customMessage);
      break;

    case "not.equal":
      value !== expected
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.not.equal(expected, customMessage);
      break;

    case "not.null":
      value
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.not.equal(expected, customMessage);
      break;

    case "contains":
      value.includes(expected)
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.contain(expected, customMessage);
      break;

    case "not.contains":
      !value.includes(expected)
        ? (customMessage = customSuccessMessage)
        : (customMessage = customFailureMessage);
      cy.expect(value).to.not.contain(expected, customMessage);
      break;

    default:
      break;
  }
}

/**
 * @description This method is used to validate the existence of an element
 *
 * @param {string} element - Element to be validated (CSS Selector)
 * @param {string} assert - Assertion to be used ("should")
 * @param {string} expected - The expected state of the element ("visible", "not.be.visible", "exist", "not.exist")
 * @param {string} customSuccessMessage - Custom message to be displayed in case of success
 * @param {string} customFailureMessage - Custom message to be displayed in case of failure
 * @param {number} timeout - Timeout in milliseconds
 *
 * @example
 * elementExpected("button", "should", "visible", "The button is visible", "The button is not visible");
 */

function elementExpected(
  element,
  assert,
  expected,
  customSuccessMessage,
  customFailureMessage,
  timeout = 5000
) {
  if (assert === "should") {
    switch (expected) {
      case "visible":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const isElementVisible = $element.is(`:${expected}`);
          const customMessage = isElementVisible
            ? customSuccessMessage
            : customFailureMessage;
          expect(isElementVisible, customMessage).to.be.true;
        });
        break;

      case "not.be.visible":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const isElementVisible = $element.is(`:${expected}`);
          const customMessage = isElementVisible
            ? customSuccessMessage
            : customFailureMessage;
          expect(isElementVisible, customMessage).to.be.true;
        });
        break;

      case "exist":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const isElementExist = $element.length > 0;
          const customMessage = isElementExist
            ? customSuccessMessage
            : customFailureMessage;
          expect(isElementExist, customMessage).to.be.true;
        });
        break;

      case "not.exist":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const isElementExist = $element.length === 0;
          const customMessage = isElementExist
            ? customSuccessMessage
            : customFailureMessage;
          expect(isElementExist, customMessage).to.be.true;
        });
        break;

      case "is.active":
        cy.get(element, { timeout: timeout }).should(($element) => {
          const isElementActive = $element.hasClass("active");
          const customMessage = isElementActive
            ? customSuccessMessage
            : customFailureMessage;
          expect(isElementActive, customMessage).to.be.true;
        });
        break;
    }
  }
}

export default {
  getValue,
  getSize,
  expected,
  elementExpected,
};