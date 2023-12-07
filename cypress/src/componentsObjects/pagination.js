// Locators
import { locatorsPagination } from "@locators/components/locatorsPagination";

// Utils
import { getValue, expected } from "@util/util";

class pagination {
  constructor() {
    this.locators = locatorsPagination;
  }

  /**
   * This method navigates to a specific page of the table. as it is a paging structure, it is necessary to inform which action (execute) must be executed so that the request can be intercepted. When the request is successfully intercepted, the mockObject is provided as the request response.
   *
   * @param {object} mockObject - Mock Object with the desired page and the command to be executed.
   * @param {object} execute - Command to be executed (click or reload).
   */
  goToMockPage(mockObject, execute) {
    cy.fixture(mockObject.mockData).then((data) => {
      let requestParameters = {
        method: "GET",
        url: mockObject.pathRequest,
        response: data,
        status: 200,
      };

      cy.interceptRequest(requestParameters, execute).then(async () => {
        // TODO: Validate navigation after implementing the new pagination component.
        //await this._validateNavigation(mockObject);
      });
    });
  }

  /**
   * This method is responsible for validate the display if the current page matches the required page and selected page and validate the navigation buttons (previous & next).
   *
   * @param {object} mockObject - Mock Object with the desired page and the command to be executed.
   */
  async _validateNavigation(mockObject) {
    const pageRequired = mockObject.pageRequired;
    const pageSelected = parseInt(
      await getValue(this.locators.current)
    );

    const infoPagination = await getValue(this.locators.info);
    const currentPage = parseInt(infoPagination.split(" ")[1]);
    const totalPages = parseInt(infoPagination.split(" ")[3]);

    await this._checkCurrentPage(pageRequired, pageSelected, currentPage);
    await this._checkPreviousButton(pageRequired);
    await this._checkNextButton(pageRequired, totalPages);
  }

  /**
   * Checks if the current page matches the required page and selected page.
   *
   * @param {number} pageRequired - The required page number.
   * @param {number} pageSelected - The selected page number.
   * @param {number} currentPage - The current page number.
   * @returns {void}
   * @example
   * _checkCurrentPage(2, 2, 2);
   */
  async _checkCurrentPage(pageRequired, pageSelected, currentPage) {
    const customSuccessMessage = `[Paginação] A página atual é a página ${pageRequired}.`;
    const customFailureMessage =
      "[Paginação] Não foi possível navegar pela página desejada.";

    expected(
      currentPage,
      "equal",
      pageRequired,
      customSuccessMessage,
      customFailureMessage
    );

    expected(
      pageSelected,
      "equal",
      pageRequired,
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * Checks if navigation previous button are not available on the first page.
   *
   * @param {number} pageRequired - The required page number.
   * @param {number} totalPages - The total number of pages.
   * @returns {void}
   * @example
   * _checkPreviousButton(1);
   */
  _checkPreviousButton(pageRequired) {
    const customSuccessMessage =
      "[Paginação] Na primeira página, o botão de navegação 'Previous' não está disponível.";
    const customFailureMessage =
      "[Paginação] Na primeira página, o botão de navegação 'Previous' está disponível.";

    if (pageRequired == 1) {
      cy.elementExpected(
        this.locators.previous,
        "should",
        "not.exist",
        customSuccessMessage,
        customFailureMessage
      );
    }
  }

  /**
   * Checks if navigation next button are not available on the last page.
   *
   * @param {number} pageRequired - The required page number.
   * @param {number} totalPages - The total number of pages.
   * @returns {void}
   * @example
   * _checkNextButton(2, 2);
   */
  _checkNextButton(pageRequired, totalPages) {
    const customSuccessMessage =
      "[Paginação] Na última página, o botão de navegação 'Next' não está disponível.";
    const customFailureMessage =
      "[Paginação] Na última página, o botão de navegação 'Next' está disponível.";

    if (pageRequired == totalPages) {
      cy.elementExpected(
        this.locators.next,
        "should",
        "not.exist",
        customSuccessMessage,
        customFailureMessage
      );
    }
  }
}

export { pagination };
