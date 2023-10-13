/**
 * This method is used to save  data in a file, specifing the file type and the contents
 * @param {string} filePath - Path of the file to be saved
 * @param {string} fileName - Name of the file to be saved
 * @param {string} fileType - Type of the file to be saved
 * @param {string} contents - Contents of the file to be saved
 * 
 * @example
 * cy.saveDataInFile("cypress/fixtures/", "data.json", "JSON", contents);
 */
Cypress.Commands.add("saveDataInFile", (filePath, fileName, fileType, contents) => {
    switch (fileType) {
      case "JSON":
        cy.writeFile(`${filePath}/${fileName}`, contents);
        break;

      default:
        break;
    }
  }
);
