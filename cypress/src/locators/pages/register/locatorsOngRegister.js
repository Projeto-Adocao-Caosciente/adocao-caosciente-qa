const locatorsOngRegister = {
  profilePhotoInput: 'input[name="name"]:first',
  profilePhoto: 'input[type="file"]',
  name: 'input[name="name"]:last',
  cnpj: 'input[name="user"]',
  email: 'input[name="email"]',
  state: 'input[name="state"]',
  city: 'input[name="city"]',
  phoneNumber: 'input[name="phone"]',
  programsAndActivities: 'textarea[name="programsAndActivities"]',
  mission: 'textarea[name="mission"]',
  foundationDate: 'input[name="foundationDate"]',
  password: 'input[name="password"]',
  confirmPassword: 'input[name="passwordConfirmation"]',

  navigation: {
    registerButton: 'button[type="submit"]',
    alreadyHaveAnAccount: "a.relative",
  },
};

export default { locatorsOngRegister };
