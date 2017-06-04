import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';

import { AuthService } from './../auth/auth.service';
import { SessionStorage } from './../storage/storage.decorator';
import { KeyValuePair, Dictionary  } from './../datastructures/data.dictionary';

export class BaseComponent implements OnInit, OnDestroy {
	protected auth: firebase.auth.Auth;
	public userLoggedIn: boolean;

	//TODO: colors are not set for the very first time when sessionStorage is empty - How to emit this??
  	@SessionStorage()
	publisherColors:Dictionary<string,string>;

	protected get postSignIn(): (firebaseUser:any) => void {
		return (user) => {};
	}

	protected handleError(err: any): void{
		console.error('An error occurred', err); // for demo purposes only
	}

	// Tomare: I don't like this since the child class need to inject authService dependency ... 
	// y don't we just instantiate inside
	constructor (protected authService: AuthService) {
		this.auth = authService.AuthInfo;
	}

	getPublisherStyle(publisherId:string) {
       var colorDict = new Dictionary<string,string> ();
       if(!this.publisherColors)
          return { 'background-color': '#000000' }

       colorDict.root = this.publisherColors.root;
       let color = colorDict.find(publisherId);
       if(color)
          return { 'background-color': color.value };

        return { 'background-color': '#000000' }
    }

	ngOnInit () {
		this.auth.onAuthStateChanged((firebaseUser:any) => {
			if(firebaseUser) {
				this.userLoggedIn = true;
				this.postSignIn(firebaseUser);
			}
			else {
				this.userLoggedIn = false;
			}
		}, err => {
			console.error(err);
		}, () => {
			console.log('Auth state change confirmed!!!');
		});
	}

	ngOnDestroy () {
		
	}
}
