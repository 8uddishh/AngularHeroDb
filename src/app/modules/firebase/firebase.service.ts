import { Injectable } from '@angular/core';
import { FirebaseApp } from './firebase.app';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
    constructor() {
        
    }

    public get FireAuth():firebase.auth.Auth {
        return FirebaseApp.getInstance().Auth;
    }

    public get FireDb():firebase.database.Database {
        return FirebaseApp.getInstance().Db;
    }

    public get FireStorage():firebase.storage.Storage {
        return FirebaseApp.getInstance().Storage;
    }
}