const locatorsAdopterRegister = {
  profilePhotoInput: 'input[name="name"]:first',
  profilePhoto: 'input[type="file"]',
  name: 'input[name="name"]:last',
  cpf: 'input[name="itr"]',
  birthDate: 'input[name="birthdate"]',
  gender: {
    select: 'button[aria-haspopup="listbox"]',
    option: (child) => `ul[role="listbox"] li[value=${child}]`,
  },
  email: 'input[name="email"]',
  phoneNumber: 'input[name="phone"]',
  address: 'input[name="address"]',
  zipCode: 'input[name="zipCode"]',
  city: 'input[name="city"]',
  state: 'input[name="state"]',
  password: 'input[name="password"]',
  confirmPassword: 'input[name="passwordConfirmation"]',

  navigation: {
    registerButton: 'button[type="submit"]',
    alreadyHaveAnAccount: "a.relative",
  },
};

export default { locatorsAdopterRegister };
