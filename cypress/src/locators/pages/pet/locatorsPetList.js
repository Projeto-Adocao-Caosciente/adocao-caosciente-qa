const locatorsPetList = {
  actions: {
    registerPet: 'section:first button',
    findPet: 'section:nth-child(3) input[aria-label="Pesquisar por nome"]',
  },

  list: {
    cards:'section:last > div',
    info: (arg) => `table > thead > th:nth-child(${arg})`,

    child: (arg) => {
      const child = `section:last > div:nth-child(${arg})`;
      return {
        info: {
            name: `${child} > div:last > p`,
        },
        actions: {
            viewDetails: `${child} > div:nth-child(3) > button:first`,
            viewForms: `${child} > div:nth-child(3) > button:last`,
            edit: `${child} > div:nth-child(3) > button:first`,
        }
      };
    },
  },
};

export default { locatorsPetList };
