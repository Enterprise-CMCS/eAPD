# Terraform for GitHub OIDC

## Usage

This Terraform module is located in a sub-directory, since some users may wish
to consume this module even if they don't need to set up self-hosted runners.
Note that to refer to a sub-directory as a Terraform module source, you need to
[include a double slash before the sub-directory](https://developer.hashicorp.com/terraform/language/modules/sources#modules-in-package-sub-directories).

```hcl
  module "github-actions-aws" {
    source = "modules//oidc/github" # double-slash denotes a sub-directory

    subject_claim_filters                         = ["repo:{your GitHub org}/{your GitHub repo}:{GitHub ref}"]
    # audience_list                               = [] # optional, defaults to ["sts.amazonaws.com"]
    # thumbprint_list                             = [] # optional, defaults to ["6938fd4d98bab03faadb97b34396831e3780aea1"]
    # github_actions_permissions_policy_json_path = "" # optional, defaults to "github_actions_permission_policy.json"
    # add_read_only_access                        = bool # optional, defaults to false
  }
```

## Permissions policy

This module assumes that the permissions policy for the IAM role will be named
`github_actions_permission_policy.json` and located in the same folder as the
root module (the path and filename are configurable via the
`github_actions_permissions_policy_json_path` variable). An example policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": ["securityhub:BatchImportFindings"],
      "Effect": "Allow",
      "Resource": "*"
    },
    {
      "Sid": "UpdateService",
      "Effect": "Allow",
      "Action": ["ecs:UpdateService"],
      "Resource": [
        "arn:aws:ecs:{your region}:{your account number}:service/{your self-hosted runner cluster name}/{your github runner service name}"
      ]
    }
  ]
}
```
