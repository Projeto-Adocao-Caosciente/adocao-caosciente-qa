// Locators and Routes
import { Routes } from "@routes/routes";
import { expected } from "@util/util";
import { locatorsAdopterRegister } from "@locators/pages/register/locatorsAdopterRegister";
import { locatorsToast } from "@locators/components/locatorsToast";

const RULES_REQUIRED_FIELDS = [
  {
    fieldLocator: locatorsAdopterRegister.name,
    label: "Nome do Adotante",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.cpf,
    label: "CPF",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.birthDate,
    label: "Data de Nascimento",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.email,
    label: "E-mail",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.phoneNumber,
    label: "Telefone",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.address,
    label: "Endereço",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.zipCode,
    label: "CEP",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.city,
    label: "Cidade",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.state,
    label: "Estado",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.password,
    label: "Senha",
    isRequired: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.confirmPassword,
    label: "Confirmação de Senha",
    isRequired: true,
  },
]

const RULES_FIELD_VALIDATION = [
  {
    fieldLocator: locatorsAdopterRegister.name,
    label: "Nome do Adotante",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.cpf,
    label: "CPF",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.birthDate,
    label: "Data de Nascimento",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.email,
    label: "E-mail",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.phoneNumber,
    label: "Telefone",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.address,
    label: "Endereço",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.zipCode,
    label: "CEP",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.city,
    label: "Cidade",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.state,
    label: "Estado",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.password,
    label: "Senha",
    isInvalid: true,
  },
  {
    fieldLocator: locatorsAdopterRegister.confirmPassword,
    label: "Confirmação de Senha",
    isInvalid: true,
  },
]

class Asserts_ST07 {
  constructor() {
  }

  CT01() {
    const customSuccessMessage = (field) => { 
      return `[Cadastro - Adotante] O campo ${field} está com a obrigatoriedade correta.`
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - Adotante] Houve um problema ao validar a obrigatoriedade do campo ${field}.`
    };

    RULES_REQUIRED_FIELDS.forEach((rule) => {
      cy.validateAttribute(
        rule.fieldLocator,
        "aria-required",
        rule.isRequired,
        customSuccessMessage(rule.label),
        customErrorMessage(rule.label)
      );
    });
  }

  CT02() {
    const customSuccessMessage = "[Cadastro - Adotante] O campo CPF está esperando uma formatação específica correta."
    const customErrorMessage = "[Cadastro - Adotante] Houve um problema ao validar a formatação do campo CPF."

    cy.validateAttribute(
      locatorsAdopterRegister.cpf,
      "aria-invalid",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT03() {
    const customSuccessMessage = "[Cadastro - Adotante] O campo Telefone está esperando uma formatação específica correta."
    const customErrorMessage = "[Cadastro - Adotante] Houve um problema ao validar a formatação do campo Telefone."

    cy.validateAttribute(
      locatorsAdopterRegister.phoneNumber,
      "aria-invalid",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT11() {
    const customSuccessMessage = "[Cadastro - Adotante] O Adotante foi Cadastrada com Sucesso e foi realizado o Login com as respectivas Credenciais.";
    const customErrorMessage = "[Cadastro - Adotante] O Adotante foi Cadastrada, entretanto ocorreu um erro ao realizar o Login com as respectivas Credenciais.";

    cy.url().should(($routeValue) => {
      expected(
        $routeValue,
        "equal",
        Routes.baseUrl + Routes.home,
        customSuccessMessage,
        customErrorMessage
      );
    });

    cy.elementExpected(
      locatorsToast.success,
      "should",
      "exist",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT12() {
    const customSuccessMessage = "[Cadastro - Adotante] O Adotante foi Cadastrada com Sucesso e foi realizado o Login com as respectivas Credenciais.";
    const customErrorMessage = "[Cadastro - Adotante] O Adotante foi Cadastrada, entretanto ocorreu um erro ao realizar o Login com as respectivas Credenciais.";

    cy.url().should(($routeValue) => {
      expected(
        $routeValue,
        "equal",
        Routes.baseUrl + Routes.home,
        customSuccessMessage,
        customErrorMessage
      );
    });

    cy.elementExpected(
      locatorsToast.success,
      "should",
      "exist",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT21() {
    const customSuccessMessage = "[Cadastro - Adotante] Não foi possível cadastrar a Adotante, pois o CPF já está vinculado à outra Adotante.";
    const customErrorMessage = "[Cadastro - Adotante] Houve uma violação de chave duplicada de CPF ao tentar cadastrar a Adotante.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Não foi possível realizar a operação desejada. O CPF informado já está cadastrado.",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT22() {
    const customSuccessMessage = "[Cadastro - Adotante] Não foi possível cadastrar a Adotante, pois o E-mail já está vinculado à outra Adotante.";
    const customErrorMessage = "[Cadastro - Adotante] Houve uma violação de chave duplicada de E-mail ao tentar cadastrar a Adotante.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Não foi possível realizar a operação desejada. O E-mail informado já está cadastrado.",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT23() {
    const customSuccessMessage = (field) => `[Cadastro - Adotante] O campo ${field} está com a validação correta de mínimo de caracteres permitidos/máscara esperada.`;
    const customErrorMessage = (field) => `[Cadastro - Adotante] Houve um problema ao validar o mínimo de caracteres permitidos/máscara esperada do campo ${field}.`

    RULES_FIELD_VALIDATION.forEach((rule) => {
      cy.validateAttribute(
        rule.fieldLocator,
        "aria-invalid",
        rule.isInvalid,
        customSuccessMessage(rule.label),
        customErrorMessage(rule.label)
      );
    });
  }

  CT31(routeValue, routeExpected) {
    const customSuccessMessage = "[Cadastro - Adotante] O redirecionamento para a página de Login ocorreu com sucesso.";
    const customErrorMessage = "[Cadastro - Adotante] Houve um problema ao redirecionar o usuário para a página de Login.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST07();