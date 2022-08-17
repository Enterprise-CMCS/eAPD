# CMS eAPD Postman Scripts

## Purpose

This folder contains scripts that can be used to communicate with the eAPD api
endpoint. The scripts are for use with [Postman](https://www.postman.com/) and
were generated with Postman version 7.28.0. The main script export file is
hitech-apd.postman_collection.json. There are also 3 environment export files,
which contain variables for the production, staging, and local dev environments.
The variables are baseURL (used in every command), created-api-id (used in the
"Get single APD" and "Patch new APD with sample data" commands), auth-username
(used in "Get nonce"), auth-password (used in JSON). The files can be imported
into Postman using the
[instructions on the Postman website](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/).
You'll then need to replace the values in the variable settings (eg, username
and password) with the values you want to use.

The scripts can be used to read and write APD data, as well as user, role,
activity, and file information.

## Getting Started

To get started, use the import button in Postman, click the folder tab, and open
the postman folder. In the confirm screen you should see the AWS production, AWS
staging, and Local dev environments, as well as the hitech-apd collection. Click
the import button and then you'll see the collection in the collections window
on the left and the environments in the dropdown list at the top of the screen.

Select the environment you want to connect to (local dev, staging, or
production) and check/set the variables for it. The baseURL variable should
already be set correctly, but the auth-username and auth-password will need to
be set. Variables can be adjusted by clicking the "eye" icon next to the
environment dropdown list.

To log in, use a combination of the "Get Nonce" and "Login" commands. The first
command gets a nonce and stores it in the auth-nonce environment variable. The
Login endpoint uses the auth-nonce variable to log in, but it only has a 3
second lifespan. So you have to quickly click the get nonce command, click send,
then the login command, and click send again. Once logged in you can use the
other commands (they won't work until you're logged in, except for OpenAPI).

## The Collection

The hitech-apd script collection is broken up into a series of folders
containing commands as follows:

### Login

The login folder contains commands that can be used to 1) log in to the
system, 2) get a list of available commands, and 3) manage the currently logged
in user's profile information

- Get nonce -- sends auth-username and gets a nonce which is stored in the
  auth-nonce variable. The nonce has a 3 second lifespan. It is used by the
  Login command to log in.
- Login -- sends auth-nonce and auth-password to log in.
- Logout -- logs out of the systen.
- OpenAPI -- gets the Open API formatted list of all possible API commands
- Get self -- gets profile information for the currently logged in user
- Update self -- updates profile information for the currently logged in user

### Local user endpoints

The local user endpoints folder contains commands that can be used to manage
users. You have to be logged in as an administrator to be able to use these
commands.

- Add a user -- add a new user
- Get all users -- get a list of all users
- Get single user -- get profile information for a single user
- Delete a user -- delete a user
- Edit a user - edit profile information for a user

### Auth activities endpoints

The auth activities endpoints folder contains a command that gets activities
related to user authorization for the different administrative roles in the
systen.

- Get all activities -- get a list of all activities for all roles

### Auth roles endpoints

THe auth roles endpoints folder contains commands for managing administrative
roles.

- Get all roles -- get a list of all administrative roles
- Create a role -- create a new administrative role
- Edit a role -- edit an administrative role
- Delete a role -- delete an administrative role

### Files

The files endpoints folder contains commands that can be used to upload or
download files.

- Upload an image to an APD -- upload an image file
- Download a file -- download a file

### APD endpoints

The APD endpoints folder contains commands for manipulating APD data

- Get list of user's APDs -- get a list of APDs that are visible to the logged
  in user
- Get single APD - get a single APD by ID. The ID can be put in the URL
  directly, for example if you wanted to retrieve APD 15 the URL would be
  {{baseURL}}/apds/15. Or you could use the created-api-id variable, in which
  case you would use URL {{baseURL}}/apds/{{created-api-id}}
- Create new APD -- creates a new APD in the system
- Patch new APD with sample data -- updates an APD in the system with sample
  data. This command requires an ID in the URL similar to "Get single APD"
- Archive an APD -- marks an APD as archived so it won't be visible in the UI

## Duplicating APD's

One thing that might end up being common is to copy an APD from one environment
to another, or to duplicate an APD in the same environment. In order to do that
you would first use "Get list of user's APDs" and determine the id of the
desired APD, then use "Get single ApD" (replacing the id number in the URL with
the id of interest) to get the APD. Then you'll need to convert the body of the
APD response into a write command. In /tools/postman folder is a file called
"empty apd write command.json". Use that as a starting point and paste the parts
of your recent APD response into it. Then do a "create new apd" and find the ID
of the new one (with "Get list of user's APDs"). Finally, build a "Patch new APD
with sample data" command with the correct ID in the URL and with the write
command pasted into the body (remove the one that's there in the body first).
