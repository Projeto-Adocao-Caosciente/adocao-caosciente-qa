// Locators and Routes
import { expected } from "../../../src/util/util";
import { Routes } from "../../../src/routes/routes";
import { locatorsLogin } from "../../../src/locators/pages/login/locatorsLogin";
import { locatorsToast } from "../../../src/locators/components/locatorsToast";

class Asserts_ST00 {
  constructor() {
  }

  CT01() {
    const customSuccessMessage = (field) => { 
      return `[Login] O campo ${field} está com a obrigatoriedade correta.`
    };
    const customErrorMessage = (field) => {
      return `[Login] Houve um problema ao validar a obrigatoriedade do campo ${field}.`
    };

    cy.validateAttribute(
      locatorsLogin.user,
      "aria-invalid",
      true,
      customSuccessMessage("CNPJ/CPF"),
      customErrorMessage("CNPJ/CPF")
    );

    cy.validateAttribute(
      locatorsLogin.password,
      "aria-invalid",
      true,
      customSuccessMessage("Senha"),
      customErrorMessage("Senha")
    );
  }

  CT02() {
    const customSuccessMessage = (field) => { 
      return `[Login] O campo ${field} está com a máscara correta.`
    };
    const customErrorMessage = (field) => {
      return `[Login] Houve um problema ao validar a máscara do campo ${field}.`
    };

    cy.validateAttribute(
      locatorsLogin.user,
      "aria-invalid",
      true,
      customSuccessMessage("CNPJ/CPF"),
      customErrorMessage("CNPJ/CPF")
    );
  }

  CT03() {
    const customSuccessMessage = "[Login] A exibição/ocultação da Senha está funcionando corretamente.";
    const customErrorMessage = "[Login] Não foi possível validar a exibição/ocultação da Senha.";

    cy.validateAttribute(
      locatorsLogin.password,
      "type",
      "text",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT04(credentials) {
    const customSuccessMessage = "[Login] O Login de uma ONG com Credenciais Válidas foi realizado com sucesso.";
    const customErrorMessage = "[Login] Não foi possível realizar o Login de uma ONG com Credenciais Válidas.";

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
      "contains",
      "Login efetuado com sucesso!",
      customSuccessMessage,
      customErrorMessage
    );

    cy.checkUserProfile(credentials.userType);
  }

  CT05(credentials) {
    const customSuccessMessage = "[Login] O Login de um Adotante com Credenciais Válidas foi realizado com sucesso.";
    const customErrorMessage = "[Login] Não foi possível realizar o Login de um Adotante com Credenciais Válidas.";

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
      "contains",
      "Login efetuado com sucesso!",
      customSuccessMessage,
      customErrorMessage
    );

    cy.checkUserProfile(credentials.userType);
  }

  CT07() {
    const customSuccessMessage = "[Login] As Credenciais Inválidas de uma ONG não permitiram o Login.";
    const customErrorMessage = "[Login] Houve um erro ao tentar realizar Login de uma ONG com Credenciais Inválidas.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Usuário ou senha invalidos!",
      customSuccessMessage,
      customErrorMessage
    );
    
    cy.url().should(($routeValue) => {
      expected(
        $routeValue,
        "equal",
        Routes.baseUrl + Routes.login,
        customSuccessMessage,
        customErrorMessage
      );
    });
  }

  CT08() {
    const customSuccessMessage = "[Login] As Credenciais Inválidas de um Adotante não permitiram o Login.";
    const customErrorMessage = "[Login] Houve um erro ao tentar realizar Login de um Adotante com Credenciais Inválidas.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Usuário ou senha invalidos!",
      customSuccessMessage,
      customErrorMessage
    );
    
    cy.url().should(($routeValue) => {
      expected(
        $routeValue,
        "equal",
        Routes.baseUrl + Routes.login,
        customSuccessMessage,
        customErrorMessage
      );
    });
  }

  CT10(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Cadastro de Adotante foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Cadastro de Adotante.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT11(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Cadastro de ONG foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Cadastro de ONG.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST00();
