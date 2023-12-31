// Locators and Routes
import { Routes } from "@routes/routes";
import { expected } from "@util/util";
import { locatorsOngRegister } from "@locators/pages/register/locatorsOngRegister";
import { locatorsToast } from "@locators/components/locatorsToast";

const RULES_REQUIRED_FIELDS = [
  {
    fieldLocator: locatorsOngRegister.profilePhotoInput,
    label: "Imagem de Perfil",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.name,
    label: "Nome da ONG",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.cnpj,
    label: "CNPJ",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.email,
    label: "E-mail",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.state,
    label: "Estado",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.city,
    label: "Cidade",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.phoneNumber,
    label: "Telefone",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.programsAndActivities,
    label: "Programas e Atividades",
    isRequired: false,
  },
  {
    fieldLocator: locatorsOngRegister.mission,
    label: "Missão",
    isRequired: false,
  },
  {
    fieldLocator: locatorsOngRegister.foundationDate,
    label: "Data de Fundação",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.password,
    label: "Senha",
    isRequired: true,
  },
  {
    fieldLocator: locatorsOngRegister.confirmPassword,
    label: "Confirmação de Senha",
    isRequired: true,
  },
]

const RULES_FIELD_VALIDATION = [

]

class Asserts_ST03 {
  constructor() {
  }

  CT01() {
    const customSuccessMessage = (field) => `[Cadastro - ONG] O campo ${field} está com obrigatoriedade correta.`;
    const customErrorMessage = (field) => `[Cadastro - ONG] Houve um problema ao validar a obrigatoriedade do campo ${field}.`

    RULES_REQUIRED_FIELDS.forEach((rule) => {
      cy.validateAttribute(
        rule.fieldLocator,
        "aria-invalid",
        rule.isRequired,
        customSuccessMessage(rule.label),
        customErrorMessage(rule.label)
      );
    });
  }

  CT02() {
    const customSuccessMessage = "[Cadastro - ONG] O campo CNPJ está esperando uma formatação específica correta."
    const customErrorMessage = "[Cadastro - ONG] Houve um problema ao validar a formatação do campo CNPJ."

    cy.validateAttribute(
      locatorsOngRegister.cnpj,
      "aria-invalid",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT03() {
    const customSuccessMessage = "[Cadastro - ONG] O campo E-mail está esperando uma formatação específica correta."
    const customErrorMessage = "[Cadastro - ONG] Houve um problema ao validar a formatação do campo E-mail."

    cy.validateAttribute(
      locatorsOngRegister.email,
      "aria-invalid",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT04() {
    const customSuccessMessage = "[Cadastro - ONG] O campo Telefone está esperando uma formatação específica correta."
    const customErrorMessage = "[Cadastro - ONG] Houve um problema ao validar a formatação do campo Telefone."

    cy.validateAttribute(
      locatorsOngRegister.phoneNumber,
      "aria-invalid",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT11() {
    const customSuccessMessage = "[Cadastro - ONG] A ONG foi Cadastrada com Sucesso e foi realizado o Login com as respectivas Credenciais.";
    const customErrorMessage = "[Cadastro - ONG] A ONG foi Cadastrada, entretanto ocorreu um erro ao realizar o Login com as respectivas Credenciais.";

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
    const customSuccessMessage = "[Cadastro - ONG] A ONG foi Cadastrada com Sucesso e foi realizado o Login com as respectivas Credenciais.";
    const customErrorMessage = "[Cadastro - ONG] A ONG foi Cadastrada, entretanto ocorreu um erro ao realizar o Login com as respectivas Credenciais.";

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
    const customSuccessMessage = "[Cadastro - ONG] Não foi possível cadastrar a ONG, pois o CNPJ já está vinculado à outra ONG.";
    const customErrorMessage = "[Cadastro - ONG] Houve uma violação de chave duplicada de CNPJ ao tentar cadastrar a ONG.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Não foi possível realizar a operação desejada. O CNPJ informado já está cadastrado.",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT22() {
    const customSuccessMessage = "[Cadastro - ONG] Não foi possível cadastrar a ONG, pois o E-mail já está vinculado à outra ONG.";
    const customErrorMessage = "[Cadastro - ONG] Houve uma violação de chave duplicada de E-mail ao tentar cadastrar a ONG.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Não foi possível realizar a operação desejada. O E-mail informado já está cadastrado.",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT23() {
    const customSuccessMessage = (field) => `[Cadastro - ONG] O campo ${field} está com a validação correta de mínimo de caracteres permitidos/máscara esperada.`;
    const customErrorMessage = (field) => `[Cadastro - ONG] Houve um problema ao validar o mínimo de caracteres permitidos/máscara esperada do campo ${field}.`

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
    const customSuccessMessage = "[Cadastro - ONG] O redirecionamento para a página de Login ocorreu com sucesso.";
    const customErrorMessage = "[Cadastro - ONG] Houve um problema ao redirecionar o usuário para a página de Login.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST03();