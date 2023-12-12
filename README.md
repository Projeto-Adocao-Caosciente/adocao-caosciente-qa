# Adocao-Caosciente-QA

Este repositório é dedicado às atividades de QA do projeto Adoção Cãosciente, em especial, à automação de testes e2e do sistema. O objetivo desta automação de testes é garantir a maior cobertura possível nos casos de testes de regressão. Em geral, os testes executados contemplam grande parte dos módulos do sistema, tendo cobertura principalmente nos fluxos felizes e2e, ou seja, os fluxos alternativos dos casos de teste ainda não foram desenvolvidos. 

___

## Módulos do Sistema Automatizado

- [X] Módulo 1: Login
- [X] Módulo 2: Cadastrar-se
- [X] Módulo 3: ONG
  - [X] Módulo 3.1: Visualizar Detalhes
  - [-] Módulo 3.2: Editar Detalhes
  - [X] Módulo 3.3: Animais
    - [X] Módulo 3.3.1: Listar Animais Existentes
    - [X] Módulo 3.3.2: Criar Animal
    - [-] Módulo 3.3.3: Editar Animal
    - [X] Módulo 3.3.4: Criar Formulário de Adoção
    - [-] Módulo 3.3.5: Editar Formulário de Adoção
    - [-] Módulo 3.3.6: Excluir Formulário de Adoção
- [X] Módulo 4: Adotante
  - [X] Módulo 4.1: Visualizar Detalhes
  - [-] Módulo 4.2: Editar Detalhes
  - [-] Módulo 4.2: Responder Formulário de Adoção
___

### 🖥️ Pre-requisitos
É necessário ter Node.js e npm instalados para executar este projeto.

> Usei as versões `v18.16.1` e `9.5.1` de Node.js e npm, respectivamente. Sugiro que você use as versões iguais ou posteriores.
___

### 🌀Clone do repositório

Clone este repositório via HTTPS: `https://github.com/Projeto-Adocao-Caosciente/adocao-caosciente-qa`

Entre na pasta do projeto: `cd adocao-caosciente-qa`
___

### 💿 Instalação

Execute `npm install` (ou `npm i` para a versão curta) para instalar as dependências de desenvolvimento.
___

### ⚠️ Observação

É necessário criar um arquivo na raiz do projeto chamado `.env` definindo o ```USER``` e a ```PASSWORD``` do usuário na aplicação.

___

## Execução do Cypress no Modo Interativo

Caso deseje executar o Cypress no modo interativo, selecionando o navegador de teste, execute `npx cypress open` ou `npm run cy:open`.

___

## 🧪 Testes

Para executar todos os arquivos de testes existentes, execute `npm tests` (ou `npm t` para a versão curta) para executar o teste no modo headless.

___

## 📈 Relatórios

Para executar todos os testes da aplicação, execute `npm run reports:all`. Este comando se responsabilizará por executar todos os casos de teste criados (pode demorar alguns minutos). Ao final dos testes. haverá um relatório disponível em HTML na pasta *'reports'.*
___

## 📊 Relatórios Parametrizáveis

Para executar todos os testes de uma pasta em específico, execute `npm run reports:specific -- --folder <tests_folder>`. Deste modo, o Cypress executará os testes em modo headless do caminho da pasta enviado como argumento. Caso não seja definido um argumento, ele irá executar todos os testes.

___

## ☕ Support this project

Se você quer apoiar este projeto, deixe um ⭐.

___

Este projeto foi criado com 💚 por [João Lucas](https://github.com/joaolucasp).
