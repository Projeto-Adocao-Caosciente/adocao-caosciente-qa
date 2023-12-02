// Locators and Routes
import { Routes } from "../../../../src/routes/routes";
import { expected } from "../../../../src/util/util";
import { locatorsAdopterRegister } from "../../../../src/locators/pages/register/locatorsAdopterRegister";
import { locatorsToast } from "../../../../src/locators/components/locatorsToast";

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

    cy.validateAttribute(
      locatorsAdopterRegister.name,
      "aria-invalid",
      true,
      customSuccessMessage("Nome do Adotante"),
      customErrorMessage("Nome do Adotante")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.cpf,
      "aria-invalid",
      true,
      customSuccessMessage("CPF"),
      customErrorMessage("CPF")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.birthDate,
      "aria-invalid",
      true,
      customSuccessMessage("Data de Nascimento"),
      customErrorMessage("Data de Nascimento")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.email,
      "aria-invalid",
      true,
      customSuccessMessage("E-mail"),
      customErrorMessage("E-mail")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.phoneNumber,
      "aria-invalid",
      true,
      customSuccessMessage("Telefone"),
      customErrorMessage("Telefone")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.address,
      "aria-invalid",
      true,
      customSuccessMessage("Endereço"),
      customErrorMessage("Endereço")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.zipCode,
      "aria-invalid",
      true,
      customSuccessMessage("CEP"),
      customErrorMessage("CEP")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.city,
      "aria-invalid",
      true,
      customSuccessMessage("Cidade"),
      customErrorMessage("Cidade")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.state,
      "aria-invalid",
      true,
      customSuccessMessage("Estado"),
      customErrorMessage("Estado")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.password,
      "aria-invalid",
      true,
      customSuccessMessage("Senha"),
      customErrorMessage("Senha")
    );

    cy.validateAttribute(
      locatorsAdopterRegister.confirmPassword,
      "aria-invalid",
      true,
      customSuccessMessage("Confirmação de Senha"),
      customErrorMessage("Confirmação de Senha")
    );
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