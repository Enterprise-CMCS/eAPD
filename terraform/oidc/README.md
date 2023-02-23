# CircleCi-oidc

This module creates the resources necessary to use CircleCi's OIDC provider to
retrieve short-term credentials from AWS for performing AWS API calls. The
advantage of this approach is that there is no need to create an IAM user and
store long-term AWS credentials in CircleCi secrets.

[Read more about configuring OpenID Connect in AWS](https://circleci.com/docs/openid-connect-tokens/)

## IAM Permissions

The resources created by this module include a policy that establishes the trust
relationship between CircleCi and AWS. However, an additional policy is needed
to grant permissions to perform AWS actions in the workflow. For example, if the
workflow is creating bucket or importing findings to Security Hub, a policy
granting those permissions would need to be attached to the role that the AWS
OIDC provider federates to upon getting a token from the CircleCi OIDC provider.
This module assumes that such a policy will be named
`[name]_permission_policy.json` and located in the same folder as the root
module (the path and filename are configurable via the
`project_permissions_policy_json_path` variable)

## Subject Claims

Subject claims allow you to configure the CircleCi project and user that is
permitted to perform AWS actions via the OIDC provider.

## Examples

### Consuming the module

This module is located in a sub-directory, Note that to refer to a sub-directory
as a module source, you need to
[include a double slash before the sub-directory](https://developer.hashicorp.com/terraform/language/modules/sources#modules-in-package-sub-directories).

### Prerequisite

Use terraform.tfvars file to update the OIDC module entries. You will need to
replace `ORG_ID` with the project's Circle CI 'Organization Id' and the
`PROJECT_ID` the CI 'Project Id')

`oidc/main.tf`

```hcl
  module "CircleCi-oidc-aws" {
    source = ""./modules/oidc"" # double-slash denotes a sub-directory

    url                                        = "https://oidc.circleci.com/org/ORG_ID"
    subject_claim_filters                      = "org/ORG_ID/project/PROJECT_ID/user/*"
    audience_list                              = ["ORG_ID"]
    thumbprint_list                            = ["9e99a48a9960b14926bb7f3b02e22da2b0ab7280"]
    add_read_only_access                       = bool
    oidc_provider_role_name                    = "$Role_Name"  string
    circleci_project_role                      = {} list(object)
  }


```

Sample `terraform.tfvars` file:

```
  url                                        = "https://oidc.circleci.com/org/b874a13f-2c70-4cd1-aaa6-edac8cc75526"
  subject_claim_filters                      = ["org/b874a13f-2c70-4cd1-aaa6-edac8cc75526/project/fc98eb8c-5243-4286-9cbc-3b9305401c76/user/*"]
  audience_list                              = ["b874a13f-2c70-4cd1-aaa6-edac8cc75526"]
  thumbprint_list                            = ["9e99a48a9960b14926bb7f3b02e22da2b0ab7280"]
  oidc_provider_role_name                    =  "circleci-identity-provider-role"

  circleci_project_role = [
      {
          role_name: "impl-oidc-role",
          description: "s3 role for use with Circlrci OIDC in impl environment",
          policy_name: "impl-oidc-policy",
          project_permissions_policy_json_path: "impl_permission_policy.json"
      },
      {
          role_name: "prod-oidc-role",
          description: "s3 role for use with Circlrci OIDC in prod environment",
          policy_name: "prod-oidc-policy",
          project_permissions_policy_json_path: "prod_permission_policy.json"
      }
  ]
```

`impl_permission_policy.json`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ImplS3Access",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::files.staging.eapd.cms.gov/*"]
    }
  ]
}
```

### Execution

Run

### Using the OIDC provider in a workflow

Note that the OpenID Connect token is only available to jobs that use at least
one context, make sure each of the jobs you want to receive an OIDC token uses a
context (the context may have no environment variables)

```yml
version: 2.1
orbs:
  aws-cli: circleci/aws-cli@3.1

jobs:
  deploy:
    docker:
      - image: cimg/aws:2022.06
    environment:
      env_var_name: us-east-1
    steps:
      - aws-cli/setup:
          role-arn: $AWS_IAM_ROLE_IMPL_ARN
      - run:
          name: create s3 bucket
          command: |
            aws s3api create-bucket --bucket cms-circleci-test-123 --region us-east-1

workflows:
  build-and-test:
    jobs:
      - deploy:
          context:
            - circleci
```

We recommend that you store the ARN of the roles created by this module as a
CircleCi Enviromental variable in you context called `AWS_IAM_ROLE_IMPL_ARN` and
`AWS_IAM_ROLE_PROD_ARN`.
