const env = require('./env');
const kubernetes = require('./k8s');
const terraform = require('./terraform');

async function run() {
  await env.apply();
  await kubernetes.apply();
  await terraform.apply();
}

run().catch((err) => {
  console.error('Sole Deployer failed with following error', err);

  process.exitCode = 1;
});
