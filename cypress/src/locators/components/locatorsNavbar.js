const locatorsNavbar = {
  userInfo: {
    name: "nav > header > div:last > div > span:nth-child(1)",
    type: "nav > header > div:last > div > span:nth-child(2)",
  },

  avatarButton: "nav > header > div:last > button",

  avatar: {
    editProfile: 'div > ul[aria-label="Profile Actions"] > li[data-key="edit"]',
    logout: 'div > ul[aria-label="Profile Actions"] > li[data-key="logout"]',
  },
};

export default { locatorsNavbar };
