import { expected } from "../../../src/util/util";

class Asserts_ST01 {
  CT01(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Login foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Login.";

    expected(
      routeValue,
      "contains",
      routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST01();
