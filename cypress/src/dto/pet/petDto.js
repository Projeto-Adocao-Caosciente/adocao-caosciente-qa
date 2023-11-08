// Utils
import { faker } from "@faker-js/faker";

class petDto {
  constructor() {
    this.setType();
    this.setAttributes();
  }

  setType() {
    const typesOfPets = ["dogs", "cats", "dinosaurs", "ponies", "rabbits"];
    this.type = faker.helpers.arrayElement(typesOfPets);
  }

  setAttributes() {
    const file = require(`../../../fixtures/pet/data/${this.type}/${this.type}.json`);
    const randomElement = faker.helpers.arrayElement(file);

    this._image = randomElement.image;
    this._name = randomElement.breed;
    this._breed = randomElement.breed;
    this._kind = randomElement.kind;
    this._height = randomElement.height;
    this._weight = randomElement.weight;
    this._specialNeeds = this._getRandomSpecialNeeds();
    this._additionalInformation = faker.lorem.paragraph(1);
  }

  _getRandomSpecialNeeds() {
    const options = ["cegueira", "surdez"];
    const specialNeeds = faker.helpers.arrayElements(options, { min: 1, max: options.length - 1 });

    return specialNeeds;
  }

  getImage() {
    return this._image;
  }

  getName() {
    return this._name;
  }

  getBreed() {
    return this._breed;
  }

  getKind() {
    return this._kind;
  }

  getHeight() {
    return this._height;
  }

  getWeight() {
    return this._weight;
  }

  getSpecialNeeds() {
    return this._specialNeeds;
  }

  getAdditionalInformation() {
    return this._additionalInformation;
  }

  setName(name) {
    this._name = name;
  }

  setBreed(breed) {
    this._breed = breed;
  }

  setKind(kind) {
    this._kind = kind;
  }

  setHeight(height) {
    this._height = height;
  }

  setWeight(weight) {
    this._weight = weight;
  }

  setSpecialNeeds(specialNeeds) {
    this._specialNeeds = specialNeeds;
  }

  setAdditionalInformation(additionalInformation) {
    this._additionalInformation = additionalInformation;
  }
}

export default { petDto };
