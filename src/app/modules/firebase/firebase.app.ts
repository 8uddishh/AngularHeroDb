import * as firebase from 'firebase';

export class FirebaseApp {
  private _fapp: firebase.app.App;
  private _fauth: firebase.auth.Auth;
  private _fdb: firebase.database.Database;
  private _fstorage: firebase.storage.Storage;

  private static _instance:FirebaseApp  = new FirebaseApp();

  constructor () {
        if(FirebaseApp._instance) {
            console.error('Use AppAuth.getInstance');
        }
        else {
            FirebaseApp._instance = this;
        }
    }

    public static getInstance():FirebaseApp
    {
        return FirebaseApp._instance;
    }

    public get Auth():firebase.auth.Auth {
        if(!this._fauth)
          console.error('You have not initialized ur app.');
        return this._fauth
    }

    public get Db():firebase.database.Database {
        if(!this._fdb)
          console.error('You have not initialized ur app.');
        return this._fdb;
    }

    public get Storage():firebase.storage.Storage {
        if(!this._fstorage)
          console.error('You have not initialized ur app.');
        return this._fstorage;
    }

    public initialize (config: any): void {
      this._fapp = firebase.initializeApp(config);
      this._fauth = this._fapp.auth();
      this._fdb = this._fapp.database();
      this._fstorage = this._fapp.storage();
    }
}