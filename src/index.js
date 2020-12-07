const env = require('./env');
const kubernetes = require('./k8s');
const terraform = require('./terraform');

env.apply();
kubernetes.apply();
terraform.apply();
