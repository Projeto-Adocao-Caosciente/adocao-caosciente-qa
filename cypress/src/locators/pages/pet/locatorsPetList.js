const locatorsPetList = {
  actions: {
    registerPet: "[data-selector='pet-register-button']",
    findPet: '[data-selector="home-filter-input"]',
  },

  list: {
    cards: '[data-selector="pet-card"]',
    card: (arg) => `[data-selector='pet-card']:nth(${arg})`,

    child: (arg) => {
      const child = `[data-selector='pet-card']:nth(${arg})`;
      return {
        info: {
          name: `${child} [data-selector="pet-card-name"]`,
        },
        actions: {
          viewDetails: `${child} [data-selector="pet-card-view-details-button"]`,
          viewForms: `${child} [data-selector="pet-card-view-forms-button"]`,
        },
      };
    },

    emptyList: '[data-selector="pet-empty-list"]',
    errorList: '[data-selector="pet-error-list"]',
  },
};

export { locatorsPetList };
