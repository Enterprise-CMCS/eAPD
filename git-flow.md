Created branch in GitHub UI.

ran ```git flow init```

Result: Branch bbrooks/3431-git-flow is not current managed by git flow

To track branch with Git-Flow, change off of the branch, then run:
```git flow feature track branch/name```
Git-Flow will rename it: feature/branch/name

Git-Flow push to remote (GitHub) either/or
```git flow feature publish branch/name```
```git push origin feature/branch/name```

Create Pull Request

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

Demo/Exercise
Setup
Git-Flow-Test Repo
Branches: main, development
Branch Protections: main, development, release(?)
Initial Commit to development, and main
Add a feature
