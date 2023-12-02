// Utils
import { generateRandomPassword } from "../../util/randomPassword";
import { faker } from "@faker-js/faker";

const faker_br = require("faker-br");

class ongDto {
  constructor({
    profilePhoto,
    name,
    shortName,
    cnpj,
    email,
    state,
    city,
    phoneNumber,
    programsAndActivities,
    mission,
    foundationDate,
    password,
  } = {}) {
    this._profilePhoto = profilePhoto || this._getRandomImage();
    this._name = name || faker.person.fullName();
    this._shortName = shortName || this._name.split(' ')[0].toLowerCase().replace('.', '');
    this._cnpj = cnpj || faker_br.br.cnpj();
    this._email = email || `ac_ong_${this._shortName}@mailinator.com`;
    this._state = state || faker_br.address.state();
    this._city = city || faker_br.address.city();
    this._phoneNumber = phoneNumber || faker_br.phone.phoneNumber('(##) #####-####');
    this._programsAndActivities = programsAndActivities || faker.lorem.sentences(1);
    this._mission = mission || faker.lorem.sentences(1);
    this._foundationDate = foundationDate || faker.date.past({ refDate: '2020-01-01' }).toISOString().split('T')[0];
    this._password = password || generateRandomPassword();

    this._saveDataInFile();
  }

  _saveDataInFile() {
    const ongData = JSON.stringify(this);

    const filePath = "cypress/fixtures/massOfData/ong";
    const fileName = `[ONG]${this._shortName}Credentials.json`;
    const fileType = "JSON";

    cy.saveDataInFile(filePath, fileName, fileType, ongData);
  }

  _getRandomImage() {
    const pathImage = "ong/profilePhoto/image";
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

  getCnpj() {
    return this._cnpj;
  }

  getEmail() {
    return this._email;
  }

  getState() {
    return this._state;
  }

  getCity() {
    return this._city;
  }

  getPhoneNumber() {
    return this._phoneNumber;
  }

  getProgramsAndActivities() {
    return this._programsAndActivities;
  }

  getMission() {
    return this._mission;
  }

  getFoundationDate() {
    return this._foundationDate;
  }

  getPassword() {
    return this._password;
  }

  getConfirmPassword() {
    return this._confirmPassword;
  }

  setProfilePhoto(photo) {
    this._profilePhoto = photo;
  }

  setName(name) {
    this._name = name;
  }

  setShortName(shortName) {
    this._shortName = shortName;
  }

  setCnpj(cnpj) {
    this._cnpj = cnpj;
  }

  setEmail(email) {
    this._email = email;
  }

  setState(state) {
    this._state = state;
  }

  setCity(city) {
    this._city = city;
  }

  setPhoneNumber(phoneNumber) {
    this._phoneNumber = phoneNumber;
  }

  setProgramsAndActivities(programsAndActivities) {
    this._programsAndActivities = programsAndActivities;
  }

  setMission(mission) {
    this._mission = mission;
  }

  setFoundationDate(foundationDate) {
    this._foundationDate = foundationDate;
  }

  setPassword(password) {
    this._password = password;
  }

  setConfirmPassword(confirmPassword) {
    this._confirmPassword = confirmPassword;
  }
}

export default { ongDto };
