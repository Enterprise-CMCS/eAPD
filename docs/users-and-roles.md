# Users and roles

As described in our [authorization model documentation](api-authorization.md),
we use a combination of role- and activity-based authorization. Every
action in the system is controlled by an "activity" permission. Roles are
essentially a collection of activities.

### Roles

The system has some predefined roles. New roles can be added as the system
is running, and the predefined roles can be modified. These are the roles
as they are defined at the "beginning":

| Name               | Activities                                                                                                                                                 | Description                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Federal analyst    | view-users<br>add-users<br>view-roles<br>create-roles<br>edit-roles<br>submit-federal-response<br>submit-clearance<br>edit-comments                        | CMS APD reviewer, needs access to everything, but should have an "assigned states" view.<br><br>Needs to be able to add comments, and send a response to the state, or send a submission into clearance.       |
| Federal leadership | view-users                                                                                                                                                 | HITECH management team, should only be able to comment on a submission that is "in clearance."<br><br>Should be able to view a list of all currently submitted documents.                                      |
| Federal SME        | edit-comments                                                                                                                                              | CMS SMEs include MMIS, HIE, and ONC staff.<br><br>Needs to be able to comment on a submission, but should not be able to send a response to the state, nor send a submission into clearance.                   |
| State coordinator  | submit-document<br>submit-state-response<br>create-draft<br>edit-document<br>edit-response                                                                 | Needs to be able to draft, submit, and respond to a "state specific" submission.<br><br>Should not have access to other states, unless access is granted.                                                      |
| State SME          | edit-document<br>edit-response                                                                                                                             | Needs to be able to comment on drafts and responses to a "state specific" submission.<br><br>Should not be able to submit or respond.<br><br>Should not have access to other states, unless access is granted. |
| Admin              | everything&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;                                                                                                                                                                                                         |

### Activities

The list of activities is fixed and is based on the things the system knows
how to do. Here are those activities:

| Name                    | Description                                                                    |
| ----------------------- | ------------------------------------------------------------------------------ |
| view-users              | Allows the user to view the list of all users or a specific user in the system |
| add-users               | Allows the user to create a new user in the system                             |
| edit-users              | Allows the user to modify users other than themselves in the system            |
| view-roles              | Allows the user to view the list of all roles in the system                    |
| create-roles            | Allows the user to create a new role in the system                             |
| edit-roles              | Allows the user to modify an existing role in the system                       |
| submit-document         | Allows the user to submit a document for CMS review                            |
| submit-federal-response | Allows the user to submit a response to a document to a state                  |
| submit-state-response   | Allows the user to submit a response to a document to CMS                      |
| submit-clearance        | Allows the user to submit a document to clearance                              |
| create-draft            | Allows the user to create a draft APD                                          |
| edit-document           | Allows the user to edit a non-submitted document                               |
| edit-response           | Allows the user to edit a document as a result of a response                   |
| edit-comments           | Allows the user to created/edit comments on a submission                       |
| delete-users            | Allows the user delete other users from the system                             |
