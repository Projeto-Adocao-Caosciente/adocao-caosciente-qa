let Routes = {
  baseUrl: Cypress.config("baseUrl"),

  // Commom Pages
  home: "/",
  login: "/login",
  register: {
    ong: "/ong-register",
    adopter: "/adopter-register",
  },
  recoverPassword: "/recover-password",

  // Logged Pages
  account: {
    details: "/account",
    edit: "/edit",
  },

  pet: {
    details: "/pet",
    register: "/pet-register",
    edit: "/pet-edit",
  },
};

export default { Routes };
