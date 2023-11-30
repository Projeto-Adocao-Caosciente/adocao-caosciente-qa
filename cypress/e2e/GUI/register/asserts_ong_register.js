// Locators and Routes
import { Routes } from "../../../src/routes/routes";
import { expected } from "../../../src/util/util";
import { locatorsOngRegister } from "../../../src/locators/pages/register/locatorsOngRegister";
import { locatorsToast } from "../../../src/locators/components/locatorsToast";

class Asserts_ST03 {
  constructor() {
  }

  CT01() {
    const customSuccessMessage = (field) => { 
      return `[Cadastro - ONG] O campo ${field} está com a obrigatoriedade correta.`
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - ONG] Houve um problema ao validar a obrigatoriedade do campo ${field}.`
    };

    cy.validateAttribute(
      locatorsOngRegister.profilePhotoInput,
      "aria-invalid",
      true,
      customSuccessMessage("Imagem de Perfil"),
      customErrorMessage("Imagem de Perfil")
    );

    cy.validateAttribute(
      locatorsOngRegister.name,
      "aria-invalid",
      true,
      customSuccessMessage("Nome da ONG"),
      customErrorMessage("Nome da ONG")
    );

    cy.validateAttribute(
      locatorsOngRegister.cnpj,
      "aria-invalid",
      true,
      customSuccessMessage("CNPJ"),
      customErrorMessage("CNPJ")
    );

    cy.validateAttribute(
      locatorsOngRegister.email,
      "aria-invalid",
      true,
      customSuccessMessage("E-mail"),
      customErrorMessage("E-mail")
    );

    cy.validateAttribute(
      locatorsOngRegister.state,
      "aria-invalid",
      true,
      customSuccessMessage("Estado"),
      customErrorMessage("Estado")
    );

    cy.validateAttribute(
      locatorsOngRegister.city,
      "aria-invalid",
      true,
      customSuccessMessage("Cidade"),
      customErrorMessage("Cidade")
    );

    cy.validateAttribute(
      locatorsOngRegister.phoneNumber,
      "aria-invalid",
      true,
      customSuccessMessage("Telefone"),
      customErrorMessage("Telefone")
    );

    cy.validateAttribute(
      locatorsOngRegister.programsAndActivities,
      "aria-invalid",
      false,
      customSuccessMessage("Programas e Atividades"),
      customErrorMessage("Programas e Atividades")
    );

    cy.validateAttribute(
      locatorsOngRegister.mission,
      "aria-invalid",
      false,
      customSuccessMessage("Missão"),
      customErrorMessage("Missão")
    );

    cy.validateAttribute(
      locatorsOngRegister.foundationDate,
      "aria-invalid",
      true,
      customSuccessMessage("Data de Fundação"),
      customErrorMessage("Data de Fundação")
    );

    cy.validateAttribute(
      locatorsOngRegister.password,
      "aria-invalid",
      true,
      customSuccessMessage("Senha"),
      customErrorMessage("Senha")
    );

    cy.validateAttribute(
      locatorsOngRegister.confirmPassword,
      "aria-invalid",
      true,
      customSuccessMessage("Confirmação de Senha"),
      customErrorMessage("Confirmação de Senha")
    );
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