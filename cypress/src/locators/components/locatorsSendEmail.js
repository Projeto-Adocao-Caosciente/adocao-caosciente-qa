const locatorsSendEmail = {
  dialog: "[data-selector='dialog-send-email']",
  emailInput: "[data-selector='dialog-send-email-input']",
  addEmailButton: "[data-selector='dialog-add-email-button']",

  listOfRecipients: (email) => {
    return {
      user: `[data-selector='destination-${email}']`,
      deleteRecipient: `[data-selector='destination-${email}'] span`,
    };
  },

  navigation: {
    sendEmailButton: "[data-selector='dialog-send-email-button']",
    backButton: "[data-selector='dialog-cancel-send-button']",
  },
};

export { locatorsSendEmail };
