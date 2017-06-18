# Angular Hero App 

This repository holds the TypeScript source code of the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html),
modified to connect to a real-time firebase database. The application uses [materialize css](http://materializecss.com/) for the css styles.

This app does have issues in general design and integration with firebase, like multi browser on same view get data and actions on one browser affecting the other. The intention is to explore the possiblities and power of angular4 and typescript generally.

Same scenario would have different implementations within the app and that is completely intentional. The source can be used as a general starting point for a normal CRUD and can be build upon. The firebase integration in this app is not be followed (as I'm not a firebase ex[ert, we only needed a database store hence the implementaion is not perfect), we recommend replacing it with a web api for data and storage.

## Prerequisites

Node.js and npm are essential to Angular development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node and npm.

## Cloning the repo

Clone this repo into new project folder (e.g., `hero-db`).
```shell
git clone https://github.com/angular/quickstart  hero-db
cd hero-db

```
Discard the `.git` folder..
```shell
rm -rf .git  # OS/X (bash)
rd .git /S/Q # windows
```

## Firebase Config Set Up

One would need a firebase account and application to integrate it with this application. Create your own firebase app and retrieve the config key into src/app/modules/config/config.module.ts. The current code will have only an empty settings as we do not want anyone to update our repository.

### Delete _non-essential_ files (optional)

*Note: no new testcases were written in this app, the existing tests on angular 4 quickstart is still preserved.

You can quickly delete the _non-essential_ files that concern testing and QuickStart repository maintenance
(***including all git-related artifacts*** such as the `.git` folder and `.gitignore`!)
by entering the following commands while in the project folder:

##### OS/X (bash)
```shell
xargs rm -rf < non-essential-files.osx.txt
rm src/app/*.spec*.ts
rm non-essential-files.osx.txt
```

##### Windows
```shell
for /f %i in (non-essential-files.txt) do del %i /F /S /Q
rd .git /s /q
rd e2e /s /q
```
## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

>Doesn't work in _Bash for Windows_ which does not support servers as of January, 2017.

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with `Ctrl-C`.

You're ready to write your application.

### npm scripts

The npm installations from the original angular quickstart is available below.

"We've captured many of the most useful commands in npm scripts defined in the `package.json`:

* `npm start` - runs the compiler and a server at the same time, both in "watch mode".
* `npm run build` - runs the TypeScript compiler once.
* `npm run build:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* `npm run serve` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server, written and maintained by
[John Papa](https://github.com/johnpapa) and
[Christopher Martin](https://github.com/cgmartin)
with excellent support for Angular apps that use routing.

## Seed the database

The seed.js file contains the necessary code to setup your firebase database with initial data. This should export data from data/hero-db.json and images from data/images. Do not forget to update the seed.config.json with your firebase api config to connect to your firebase account. Make sure that the authentication on your firebase app is turned off for the database and storage during the seed installation. One can run the seed file with command

```shell

    npm run seed

```

Once the seed is run successfully, turn on the authentication features on your firebase app. The rules for db is available in data/rules.json. One would need to manually copy paste these rules in the Firebase data.

## Authentication
The app allows Google, facebook, twitter and email sign in with firebase app. Do make sure that these features are turned on your firebase app.

