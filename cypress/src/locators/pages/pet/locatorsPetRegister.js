const locatorsPetRegister = {
  profilePhotoInput: 'input[name="name"]:first',
  profilePhoto: 'input[type="file"]',
  name: 'input[name="name"]:last',
  breed: 'input[name="breed"]',
  kind: 'input[name="kind"]',
  height: 'input[name="height"]',
  weight: 'input[name="weight"]',
  specialNeeds: {
    select: 'button[aria-haspopup="listbox"]',
    option: (child) => `ul[role="listbox"] li[value=${child}]`,
  },
  additionalInformation: 'textarea[name="additionalInformation"]',

  navigation: {
    registerButton: "section:last button:first",
    cancel: "section:last button:last",
  },
};

export default { locatorsPetRegister };
