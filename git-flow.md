Created branch in GitHub UI.

ran ```git flow init```

Result: Branch bbrooks/3431-git-flow is not current managed by git flow

To track branch with Git-Flow, change off of the branch, then run:
```git flow feature track branch/name```
Git-Flow will rename it: feature/branch/name


Git-Flow Primer
Install:
Ubuntu: ```sudo apt-get install git-flow```
Mac Homebrew: ```brew install git-flow-avh```

In the repo you want Git-Flow to hook into: ```git flow init```

Branches:
main - Production reflective branch
development - Actively being developed branch
feature - Branch where new features are being developed
release - Branch getting ready to be deployed to Prod, heavily tested
hotfix - Branch applied to fix bugs in main
bugfix - Branch applied to fix bugs in release
support - 
