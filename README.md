# Angular Hero App 

This repository holds the TypeScript source code of the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html),
modified to connect to a real-time firebase database. The application uses [materialize css](http://materializecss.com/) for the css styles. The intention is to explore the possiblities and power of angular4 and typescript generally.

Same scenario would have different implementations within the app and that is completely intentional. The source can be used as a general starting point for a normal CRUD and can be build upon. The firebase integration in this app is not to be followed for a realtime application design as it is not foolproof, we recommend replacing it with a web api for data and storage.

## Prerequisites

Node.js and npm are essential to Angular development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node and npm.

## Cloning the repo

Clone this repo into new project folder (e.g., `herodb`).
```shell
git clone https://github.com/8uddishh/AngularHeroDb  herodb
cd herodb

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

## Seed the database (Optional)

A seperate repository is available to seed the firebase db <a href="https://github.com/8uddishh/HeroAppSeed" target="_blank" title="Seed project">AngularHeroSeed</a>. This step is optional, one can clone the repository and follow the steps to set up the firebase db.

## Authentication
The app allows Google, facebook, twitter and email sign in with firebase app. Do make sure that these features are turned on your firebase project. Instructions to set up social authentications are available in <a href="https://firebase.google.com/docs/auth/" target="_blank" title="Authentication">Firebase Docs</a>. Google and email password authentication are straight forward. To enable Twitter and Facebook authentication one would need to create a app in Twitter / Facebook and retrieve oauth token from there. 

The recommended rules for database and storage in your firebase project is also available in the seed repository. One can follow the instructions in the seed repository.

## Bugs
The application should work fine on most of the scenario. There are some known issues in multi browsers, especially when both browsers are on the same entity. Eg if two browsers are trying to update Batman, change in one is automaticaly getting updating other browser too. This is a firebase feature and hence we have not taken any steps to fix them.

## Tomare
We donot intend to update this repository regularly as this is not an utility. So no pull requests please. You are welcome to use this repository make modifications and use it in your own repository.

Thanks n Cheers!!!!

