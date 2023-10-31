// Locators and Routes
import { Routes } from "../../../src/routes/routes";
import { locatorsRegister } from "../../../src/locators/pages/register/locatorsRegister";

// Page Objects
import ongRegister from "../../../src/pageObjects/register/ongRegister";

// Asserts to Suite Test 03: Análise do Funcionamento da Página de Cadastro de ONG
import Asserts_ST03 from "./asserts_ong_register";

describe("ST03: Análise do Funcionamento da Página de Cadastro de ONG", () => {
  beforeEach(() => {
    cy.visit(Routes.register);
  });

  context("Context 01: Testes Funcionais nos Campos na Página de Cadastro de ONG", () => {
    it("CT01: Validar obrigatoriedade dos Campos.", () => {
    });

    it("CT02: Validar formato específico do campo CNPJ/CPF.", () => {
    });

    it("CT03: Validar formato específico do campo E-mail.", () => {
    });

    it("CT04: Validar formato específico do campo Telefone", () => {
    });

    it("CT05: Validar formato específico do campo Imagem da ONG", () => {
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de ONG.", () => {
    it.only("CT11: Preenchimento de Todos os Campos.", () => {
      const ongData = ongRegister.fillAllFields(true);
      ongRegister.registerOng();

      console.log(ongData);
    });

    it("CT12: Preenchimento de Todos os Campos Obrigatórios.", () => {
    });
  });

  context("Context 03: Cenários Alternativos de Criação de ONG.", () => {
    it("CT21: Tentativa de Criação de uma ONG cujo CNPJ já está vinculado à outra ONG.", () => {
    });

    it("CT22: Tentativa de Criação de uma ONG cujo E-mail já está cadastrado.", () => {
    });

    it("CT22: Tentativa de Criação de uma ONG com campos fora da Formatação Esperada.", () => {
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de ONG.", () => {
    it("CT31: Validar Redirecionamento para a Página de Login.", () => {
    });
  });
});
