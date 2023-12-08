// Utils
import { faker } from "@faker-js/faker";

class petDto {
  constructor({
    type,
    image,
    name,
    breed,
    kind,
    height,
    weight,
    specialNeeds,
    additionalInformation,
  } = {}) {
    this.setType(type);
    this.setAttributes(
      image,
      name,
      breed,
      kind,
      height,
      weight,
      specialNeeds,
      additionalInformation
    );
  }

  setType(type = "random") {
    const typesOfPets = ["dogs", "cats", "dinosaurs", "ponies", "rabbits"];

    type === "random"
      ? (this.type = faker.helpers.arrayElement(typesOfPets))
      : (this.type = "default");
  }

  setAttributes(image, name, breed, kind, height, weight, specialNeeds, additionalInformation) {
    const file = require(`../../../fixtures/pet/randomData/${this.type}/${this.type}.json`);
    const randomElement = faker.helpers.arrayElement(file);

    this._image = image || randomElement.image;
    this._name = name || randomElement.name;
    this._breed = breed || randomElement.breed;
    this._kind = kind || randomElement.kind;
    this._height = height || String(randomElement.height).replace(".", ",");
    this._weight = weight || String(randomElement.weight).replace(".", ",");
    this._specialNeeds = specialNeeds || this._getRandomSpecialNeeds();
    this._additionalInformation = additionalInformation || faker.lorem.paragraph(1);
  }

  _getRandomSpecialNeeds() {
    const options = ["cegueira", "surdez"];
    const specialNeeds = faker.helpers.arrayElements(options, {
      min: 1,
      max: options.length - 1,
    });

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

export { petDto };
