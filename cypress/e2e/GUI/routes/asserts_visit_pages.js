import { expected } from "@util/util";
class Asserts_ST01 {
  constructor() {
    this.baseUrl = "https://adocao-caosciente-frontend.vercel.app";
  }

  CT01(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Login foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Login.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT02(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Cadastro de ONG foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Cadastro de ONG.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT03(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Cadastro de Adotante foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Cadastro de Adotante.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT04(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página Home foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página Home.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT05(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Detalhes da Conta foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Detalhes da Conta.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT06(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Edição da Conta foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Edição da Conta.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT07(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Detalhes do Pet foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Detalhes do Pet.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT08(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Cadastro do Pet foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Cadastro do Pet.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT09(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Edição do Pet foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Edição do Pet.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST01();
