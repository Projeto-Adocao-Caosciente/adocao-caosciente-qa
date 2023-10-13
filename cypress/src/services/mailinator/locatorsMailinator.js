const locatorsInboxPaneMailinator = {
  emailInbox: "#inbox_pane #inbox_field",

  commands: {
    searchInbox: "#inbox_pane div:last-child button.primary-btn",
    deleteEmail: '#inbox_pane div button[aria-label="Delete Button"]',

    pauseReceivedEmails: '#inbox_pane > div button[aria-label="Pause Button"]',
    unpauseReceivedEmails: '#inbox_pane > div button[aria-label="Unpause Button"]',
  },

  table: {
    thead: ".wrapper-table > table > tbody > tr > td",
    header: (arg) =>
      `.wrapper-table > table > tbody > tr > td:nth-child(${arg})`,

    tbody: ".os-content > table > tbody > tr",
    child: (arg) => {
      const child = `.os-content > table > tbody > tr:nth-child(${arg})`;
      return {
        check: `${child} > td:nth-child(1) > div > input[type="checkbox"]`,
        from: `${child} > td:nth-child(2)`,
        subject: `${child} > td:nth-child(3)`,
        received: `${child} > td:nth-child(4)`,
      };
    },
  },
};

const locatorsEmailPaneMailinator = {
  commands: {
    backToInbox: "#email_pane .wrapper-main-title > div:last-child > a",
  },

  headerResponse: {
    to: "#email_pane .message-header > .sender-info > div:nth-child(1) > div:last-child",
    from: "#email_pane .message-header > .sender-info > div:nth-child(2) > div:last-child",
    sendingIP: "#email_pane .message-header > .sender-info > div:nth-child(3) > div:last-child",
    received: "#email_pane .message-header > .sender-info > div:nth-child(4) > div:last-child"
  },

  bodyResponse: {
    responseFormats: {
      html: {
        navigate: "#email_pane #pills-html-tab",
        body: "#email_pane #html_msg_body",
      },

      text: {
        navigate: "#email_pane #pills-textbuthtml-tab",
        body: "#email_pane #texthtml_msg_body",
      },

      json: {
        navigate: "#email_pane #pills-json-tab",
        body: "#email_pane #pills-json-content > pre",
      },

      raw: {
        navigate: "#email_pane #pills-raw-tab",
        body: "#email_pane #pills-raw-content > pre",
      },

      links: {
        navigate: "#email_pane #pills-links-tab",
        body: {
          content: "#email_pane #pills-links-content > table > tbody",
          child: (arg) => {
            const linkKey = `#email_pane #pills-links-content > table > tbody > tr:nth-child(${arg})`;
            return {
              linkName: `${linkKey} > td:nth-child(1)`,
              url: `${linkKey} > td:nth-child(2) > a`,
            };
          },
        },
      },
    },
  },
};

export default { locatorsInboxPaneMailinator, locatorsEmailPaneMailinator };
