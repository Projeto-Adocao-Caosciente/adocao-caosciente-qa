const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');
const { exec } = require('child_process');

// Define os argumentos que podem ser passados na linha de comando
const argv = yargs(hideBin(process.argv)).option('folder', {
  alias: 'f',
  describe: 'Caminho da pasta com os arquivos de teste',
  type: 'string',
}).argv;

// Obtém o valor do argumento "folder" (caminho da pasta) ou define um valor padrão se não for fornecido
const folderPath = argv.folder || 'cypress/e2e/GUI/';

// Executa o comando "cypress run" com as opções do relatório
const command = `cypress run --spec ${folderPath}/*.cy.js --reporter-options reportDir=reports,overwrite=false,html=true,json=false,timestamp=mmddyyyy_HHMMss`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro: ${error.message}`);
    return;
  }
  console.log(stdout);
});
