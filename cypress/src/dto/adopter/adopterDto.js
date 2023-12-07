// Utils
import { generateRandomPassword } from "@util/randomPassword";
import { faker } from "@faker-js/faker";

const faker_br = require("faker-br");

class adopterDto {
  constructor({
    name,
    shortName,
    cpf,
    birthDate,
    gender,
    email,
    phoneNumber,
    address,
    zipCode,
    city,
    state,
    password,
} = {}) {
    this._name = name || faker.person.fullName();
    this._shortName = shortName || this._name.split(' ')[0].toLowerCase().replace('.', '');
    this._cpf = cpf || faker_br.br.cpf();
    this._birthDate = birthDate || faker.date.past({ refDate: '2005-01-01' }).toISOString().split('T')[0];
    this._gender = gender || faker.helpers.arrayElements(['Masculino', 'Feminino', 'Prefiro não dizer'], {min: 1, max: 1});
    this._email = email || `ac_adopter_${this._shortName}@mailinator.com`;
    this._phoneNumber = phoneNumber || faker_br.phone.phoneNumber('(##) #####-####');
    this._address = address || faker_br.address.streetAddress();
    this._zipCode = zipCode || faker_br.address.zipCodeValid();
    this._city = city || faker_br.address.city();
    this._state = state || faker_br.address.stateAbbr();
    this._password = password || generateRandomPassword();

    this._saveDataInFile();
  }

  _saveDataInFile() {
    const adopterData = JSON.stringify(this);

    const filePath = "cypress/fixtures/massOfData/adopter";
    const fileName = `[ADOPTER]${this._shortName}Credentials.json`;
    const fileType = "JSON";

    cy.saveDataInFile(filePath, fileName, fileType, adopterData)
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

  getPassword() {
    return this._password;
  }

  getConfirmPassword() {
    return this._confirmPassword;
  }

  setName(name) {
    this._name = name;
  }

  setShortName(shortName) {
    this._shortName = shortName;
  }

  setCpf(cpf) {
    this._cpf = cpf;
  }

  setBirthDate(birthDate) {
    this._birthDate = birthDate;
  }

  setGender(gender) {
    this._gender = gender;
  }

  setEmail(email) {
    this._email = email;
  }

  setPhoneNumber(phoneNumber) {
    this._phoneNumber = phoneNumber;
  }

  setAddress(address) {
    this._address = address;
  }

  setZipCode(zipCode) {
    this._zipCode = zipCode;
  }

  setCity(city) {
    this._city = city;
  }

  setState(state) {
    this._state = state;
  }

  setPassword(password) {
    this._password = password;
  }

  setConfirmPassword(confirmPassword) {
    this._confirmPassword = confirmPassword;
  }
}

export { adopterDto };
