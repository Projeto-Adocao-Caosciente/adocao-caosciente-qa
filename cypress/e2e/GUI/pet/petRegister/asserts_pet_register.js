// Locators and Routes
import { Routes } from "@routes/routes";
import { locatorsPetRegister } from "@locators/pages/pet/locatorsPetRegister";
import { locatorsToast } from "@locators/components/locatorsToast";

// Utils
import { expected } from "@util/util";

const RULES_REQUIRED_FIELDS = [
  {
    field: locatorsPetRegister.profilePhotoInput,
    label: "Imagem de Perfil",
    isRequired: true,
  },
  {
    field: locatorsPetRegister.name,
    label: "Nome do PET",
    isRequired: true,
  },
  {
    field: locatorsPetRegister.breed,
    label: "Raça do PET",
    isRequired: true,
  },
  {
    field: locatorsPetRegister.kind,
    label: "Tipo do PET",
    isRequired: true,
  },
  {
    field: locatorsPetRegister.height,
    label: "Altura do PET",
    isRequired: true,
  },
  {
    field: locatorsPetRegister.weight,
    label: "Peso do PET",
    isRequired: true,
  },
  {
    field: locatorsPetRegister.specialNeeds,
    label: "Necessidades Especiais do PET",
    isRequired: false,
  },
  {
    field: locatorsPetRegister.additionalInformation,
    label: "Informações Adicionais do PET",
    isRequired: false,
  }
]

class Asserts_ST05 {
  constructor() {}

  CT01() {
    const customSuccessMessage = (field) => {
      return `[Cadastro - PET] O campo ${field} está com a obrigatoriedade correta.`;
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - PET] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    RULES_REQUIRED_FIELDS.forEach((rule) => {
      cy.validateAttribute(
        rule.field,
        "aria-invalid",
        rule.isRequired,
        customSuccessMessage(rule.label),
        customErrorMessage(rule.label)
      );
    });
  }

  CT09(elementValue, expectedValue) {
    const customSuccessMessage =
      "[Cadastro - PET] O PET foi Cadastrado com Sucesso com Todos os Campos.";
    const customErrorMessage =
      "[Cadastro - PET] Houve um problema ao Cadastrar o PET com Todos os Campos.";

    let elementFound = false;

    elementValue.forEach((element) => {
      if (element.name == expectedValue.getName()) {
        elementFound = true;
        return;
      }
    });

    expected(
      elementFound,
      "equal",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

   CT10(elementValue, expectedValue) {
    const customSuccessMessage =
      "[Cadastro - PET] O PET foi Cadastrado com Sucesso com Apenas os Campos Obrigatórios.";
    const customErrorMessage =
      "[Cadastro - PET] Houve um problema ao Cadastrar o PET com Apenas os Campos Obrigatórios.";

    let elementFound = false;

    elementValue.forEach((element) => {
      if (element.name == expectedValue.getName()) {
        elementFound = true;
        return;
      }
    });

    expected(
      elementFound,
      "equal",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT12() {
    const customSuccessMessage = (field) => {
      return `[Cadastro - PET] O campo ${field} está com a obrigatoriedade correta.`;
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - PET] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    const RULES_FIELD_VALIDATION = [
      {
        field: locatorsPetRegister.profilePhotoInput,
        label: "Imagem de Perfil",
        isInvalid: false,
      },
      {
        field: locatorsPetRegister.name,
        label: "Nome do PET",
        isInvalid: false,
      },
      {
        field: locatorsPetRegister.breed,
        label: "Raça do PET",
        isInvalid: false,
      },
      {
        field: locatorsPetRegister.kind,
        label: "Tipo do PET",
        isInvalid: false,
      },
      {
        field: locatorsPetRegister.height,
        label: "Altura do PET",
        isInvalid: true,
      },
      {
        field: locatorsPetRegister.weight,
        label: "Peso do PET",
        isInvalid: true,
      },
      {
        field: locatorsPetRegister.specialNeeds,
        label: "Necessidades Especiais do PET",
        isInvalid: false,
      },
      {
        field: locatorsPetRegister.additionalInformation,
        label: "Informações Adicionais do PET",
        isInvalid: false,
      }
    ]

    RULES_FIELD_VALIDATION.forEach((rule) => {
      cy.validateAttribute(
        rule.field,
        "aria-invalid",
        rule.isInvalid,
        customSuccessMessage(rule.label),
        customErrorMessage(rule.label)
      );
    });
  }

  CT13(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Cadastro - PET] O redirecionamento para a página de Listagem de PET's da ONG ocorreu com sucesso.";
    const customErrorMessage =
      "[Cadastro - PET] Houve um problema ao redirecionar o usuário para a página de Listagem de PET's da ONG.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST05();
