const locatorsPetList = {
  actions: {
    registerPet: 'section:first button',
    findPet: 'section:nth-child(3) input[aria-label="Pesquisar por nome"]',
  },

  list: {
    cards:'section:last > div',
    card: (arg) => `section:last > div:nth-child(${arg})`,

    child: (arg) => {
      const child = `section:last > div:nth-child(${arg})`;
      return {
        info: {
            name: `${child} > div:last > p`,
        },
        actions: {
            viewDetails: `${child} > div:nth-child(2) button:first`,
            viewForms: `${child} > div:nth-child(2) button:last`,
            edit: `${child} > div:nth-child(2) button:first`,
        }
      };
    },
  },
};

export default { locatorsPetList };
