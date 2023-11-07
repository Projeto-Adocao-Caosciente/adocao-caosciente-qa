const locatorsPetRegister = {
    profilePhotoInput: 'input[name="name"]:first', 
    profilePhoto: 'input[type="file"]',
    name: 'input[name="name"]:last',
    kind: 'input[name="kind"]',
    height: 'input[name="height"]',
    weight: 'input[name="weight"]',
    specialNeeds: 'div[data-testid="hidden-select-container"]',
    additionalInformation: 'textarea[name="additionalInformation"]',

    navigation: {
        registerButton: 'button[type="submit"]',
        cancel: 'a.relative',
    }
};

export default { locatorsPetRegister };