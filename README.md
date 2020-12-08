# Sole Deployer Action

This action deploys changes to Kubernetes and Terraform together in a single step. 

## Inputs

### `kubeconfig_data`

Base64 encoded config for the target Kubernetes cluster. Must be provided when `manifest_locations` is included.

### `env_files`

Space seperated list of .env files to be used during the deployments. Provided paths should be relative to the root of the target repository.

### `manifest_locations`

Space seperated list containing paths to Kubernetes manifest files, and/or directories that contain Kubernetes manifest files, that will be applied during the deployment. The provided paths should be relative to the root of the target repository.

### `terraform_directory`

Path to the directory that contains the Terraform files that will be applied during the deployment.

### `terraform_workspace`

Name of the Terraform workspace to which the changes will be applied. Must be provided when `terraform_directory` is included.
### `terraform_var_file`

Path to the file that contains the Terraform variables that will be used during the deployment.

### `dry_run`

If `true` the Kubectl manifest files will be applied with `--dry-run=server` and Terraform changes will plan only.

## Example usage
```
uses: The-Sole-Supplier/sole-deployer@master
with:
  kubeconfig_data: ${{ secrets.KUBE_CONFIG_QA }}
  env_files: ./cluster/env/global.env ./cluster/env/qa.env
  manifest_locations: ./cluster/core ./cluster/qa ./cluster/ingress.yml
  terraform_directory: ./terraform
  terraform_workspace: qa
  terraform_var_file: ./terraform/env/qa.tfvars
```
