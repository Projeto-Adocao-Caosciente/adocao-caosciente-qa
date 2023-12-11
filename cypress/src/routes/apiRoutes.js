const ApiRoutes = {
  register: {
    ong: "/auth/register_ong",
    adopter: "/auth/register_adopter",
  },

  authentication: "/auth/login",

  ong: {
    pet: {
      getAll: "/ong/animals",
      getOne: "/ong/animals/**",
      search: "/ong/animals?name=**",
      register: "/ong/animals",

      form: {
        getAll: "/ong/animals/**/forms",
        getOne: "/ong/animals/**/forms/**",
        register: "/ong/animals/**/forms",
      },
    },

    details: "/auth/profile",
    edit: "/ong",
  },

  adopter: {
    pet: {
      getAll: "/adopter/animals",
      getOne: "/adopter/animals/**",
      search: "/adopter/animals?name=**",
    },

    details: "/auth/profile",
    edit: "/adopter",
  },

  mail: {
    sendMail: "/email/send",
  }
};

export { ApiRoutes };
