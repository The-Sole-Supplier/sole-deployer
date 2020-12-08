const dotenv = require('dotenv');
const path = require('path');

const envFiles = process.env.INPUT_ENV_FILES?.split(' ');

function apply() {
  if (!envFiles) return console.log('No .env files were provided');

  console.log('Applying .env files');

  envFiles.forEach((envFile) =>
    dotenv.config({ path: path.resolve(process.cwd(), envFile) })
  );

  console.log('.env files applied');
}

module.exports = { apply };
