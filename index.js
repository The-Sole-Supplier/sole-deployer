const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

fs.writeFileSync(
  '/tmp/config',
  Buffer.from(process.env.INPUT_KUBECONFIG_DATA, 'base64')
);

const envFiles = process.env.INPUT_ENV_FILES?.split(' ');
const manifestLocations = process.env.INPUT_MANIFEST_LOCATIONS?.split(' ');

function getManifestFiles(location) {
  const fullPath = path.resolve(process.cwd(), location);

  return fs
    .readdirSync(fullPath)
    .filter(
      (filename) => filename.endsWith('.yml') || filename.endsWith('.yaml')
    )
    .map((filename) => `${fullPath}/${filename}`);
}

function applyManifestFile(file) {
  const { code } = shell.exec(`cat ${file} | envsubst | kubectl apply -f -`);

  if (code !== 0) throw Error('Failed to apply mainfest file');
}

function applyManifestFiles() {
  if (!manifestLocations)
    return console.log('No manifest locations were provided');

  console.log('Applying manifest files');

  manifestLocations.flatMap(getManifestFiles).forEach(applyManifestFile);

  console.log('Manifest files applied');
}

function applyEnvFiles() {
  if (!envFiles) return console.log('No .env files were provided');

  console.log('Applying .env files:', envFiles);

  envFiles.forEach((envFile) =>
    dotenv.config({ path: path.resolve(process.cwd(), envFile) })
  );

  console.log('.env files applied');
}

applyEnvFiles();
applyManifestFiles();
