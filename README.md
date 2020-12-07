# Sole Deployer Action

This action deploys changes to Kubernetes and Terraform together in a single step. 

## Inputs

### `kubeconfig_data`

Base64 encoded config for the target Kubernetes cluster.

### `env_files`

Space seperated list of .env files to be used during the dpeloyments. Provided paths should be relative to the root of the target repository.

### `manifest_locations`

Space seperated list containing paths to Kubernetes manifest files, and/or directories that contain Kubernetes manifest files, that will be applied during the deployment. The provided paths should be relative to the root of the target repository.

## Example usage
```
uses: The-Sole-Supplier/sole-deployer@master
with:
  kubeconfig_data: ${{ secrets.KUBE_CONFIG_QA }}
  env_files: ./cluster/env/global.env ./cluster/env/qa.env
  manifest_locations: ./cluster/core ./cluster/qa ./cluster/ingress.yml
```