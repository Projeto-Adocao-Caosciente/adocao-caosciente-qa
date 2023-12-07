const locatorsLogin = {
  // Input's
  user: 'input[name="user"]',
  password: 'input[name="password"]',

  // Button's
  changePasswordHiding: "button:first",
  loginButton: "#login-button",

  // Link's
  register: {
    adopter: 'form > section:last a[role="link"]:first',
    ong: 'form > section:last a[role="link"]:last',
  },
};

export { locatorsLogin };
