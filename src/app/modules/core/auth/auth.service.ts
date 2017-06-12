import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { FirebaseService } from './../../firebase/firebase.service';

@Injectable()
export class AuthService {

    private _auth: firebase.auth.Auth;

    public get AuthInfo() : firebase.auth.Auth {
        return this._auth;
    }

    constructor (private firebaseService: FirebaseService) {
        this._auth = firebaseService.FireAuth;
    }

    signInWithGoogle(): firebase.Promise<any> {
        return this._auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    signInWithFacebook(): firebase.Promise<any> {
        return this._auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    signInWithTwitter(): firebase.Promise<any> {
        return this._auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

    signInWithEmail(email: string, pass:string): firebase.Promise<any> {
        return this._auth.signInWithEmailAndPassword(email, pass);
    }

    registerEmailandPassword(email:string, pass:string): firebase.Promise<any>  {
        return this._auth.createUserWithEmailAndPassword(email, pass);
    }

    signOut(): firebase.Promise<any> {
        return this._auth.signOut();
    }
}