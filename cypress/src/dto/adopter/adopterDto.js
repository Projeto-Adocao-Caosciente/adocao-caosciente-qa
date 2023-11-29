// Utils
import { generateRandomPassword } from "../../util/randomPassword";
import { faker } from "@faker-js/faker";

const faker_br = require("faker-br");

class adopterDto {
  constructor() {
    this._profilePhoto = this._getRandomImage();
    this._name = faker.person.fullName();
    this._shortName = this._name.split(" ")[0].toLowerCase().replace(".", "");
    this._cpf = faker_br.br.cpf();
    this._birthDate = faker.date.past({refDate: "2005-01-01"}).toISOString().split("T")[0];
    this._gender = faker.random.arrayElement(["Masculino", "Feminino"]);
    this._email = `ac_adopter_${this._shortName}@mailinator.com`;
    this._phoneNumber = faker_br.phone.phoneNumber("(##) #####-####");
    this._address = faker_br.address.streetAddress();
    this._zipCode = faker_br.address.zipCode();
    this._city = faker_br.address.city();
    this._password = generateRandomPassword();

    this._saveDataInFile();
  }

  _saveDataInFile() {
    const adopterData = JSON.stringify(this);

    const filePath = "cypress/fixtures/massOfData/adopter";
    const fileName = `[ADOPTER]${this._shortName}Credentials.json`;
    const fileType = "JSON";

    cy.saveDataInFile(filePath, fileName, fileType, adopterData)
  }

  _getRandomImage() {
    const pathImage = "adopter/profilePhoto/image";
    const randomNumber = Math.floor(Math.random() * 5) + 1;

    return `${pathImage}${randomNumber}.jpg`;
  }

  getProfilePhoto() {
    return this._profilePhoto;
  }

  getName() {
    return this._name;
  }

  getShortName() {
    return this._shortName;
  }

  getCpf() {
    return this._cpf;
  }

  getBirthDate() {
    return this._birthDate;
  }

  getGender() {
    return this._gender;
  }

  getEmail() {
    return this._email;
  }

  getPhoneNumber() {
    return this._phoneNumber;
  }

  getAddress() {
    return this._address;
  }

  getZipCode() {
    return this._zipCode;
  }

  getCity() {
    return this._city;
  }

  getState() {
    return this._state;
  }

  setPassword(password) {
    this._password = password;
  }

  setConfirmPassword(confirmPassword) {
    this._confirmPassword = confirmPassword;
  }
}

export default { adopterDto };
