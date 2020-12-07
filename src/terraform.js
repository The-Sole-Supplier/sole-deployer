const shell = require('shelljs');

const tfDir = process.env.INPUT_TERRAFORM_DIRECTORY;
const tfWorkspace = process.env.INPUT_TERRAFORM_WORKSPACE;
const tfVarFile = process.env.INPUT_TERRAFORM_VAR_FILE;

function exec(command) {
  if (shell.exec(command).code !== 0) throw Error('Terraform command failed');
}

async function apply() {
  if (!tfDir) return console.log('No terraform directory provided');

  exec(`terraform init ${tfDir}`);
  exec(`terraform workspace select ${tfWorkspace} ${tfDir}`);
  exec(`terraform apply -var-file=${tfVarFile} ${tfDir} -auto-approve`);
}

module.exports = { apply };
