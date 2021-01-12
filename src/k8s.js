const envsub = require('envsub');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const manifestLocations = process.env.INPUT_MANIFEST_LOCATIONS?.split(' ').filter(Boolean);
const kubeConfigData = process.env.INPUT_KUBECONFIG_DATA;
const dryRun = process.env.INPUT_DRY_RUN === 'true';

function hasYamlExtension(path) {
  return path.endsWith('.yml') || path.endsWith('.yaml');
}

function getManifestFiles(location) {
  const fullPath = path.resolve(process.cwd(), location);

  if (hasYamlExtension(location)) return fullPath;

  return fs
    .readdirSync(fullPath)
    .filter(hasYamlExtension)
    .map((filename) => `${fullPath}/${filename}`);
}

async function applyManifestFile(templateFile) {
  const outputFile = `${templateFile}_output`;

  await envsub({ templateFile, outputFile });

  const dryRunArg = dryRun ? '--dry-run=server' : '';

  const { code } = shell.exec(`kubectl apply ${dryRunArg} -f ${outputFile}`);

  if (code !== 0) throw Error('Failed to apply mainfest file');
}

async function apply() {
  console.log('manifestLocations: ', manifestLocations);
  if (!manifestLocations || !manifestLocations.length)
    return console.log('No manifest locations were provided');

  console.log('Applying Kubernetes manifest files');

  fs.writeFileSync('/tmp/config', Buffer.from(kubeConfigData, 'base64'));

  await Promise.all(
    manifestLocations.flatMap(getManifestFiles).map(applyManifestFile)
  );

  console.log('Kubernetes manifest files applied');
}

module.exports = { apply };
