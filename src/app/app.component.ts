import { Component } from '@angular/core';
import * as _ from 'lodash'

import { LoggedInUser } from './modules/core/login/login.user.model';
import { AuthService } from './modules/core/auth/auth.service';
import { BaseComponent } from './modules/core/base/base.component';

import { PublisherService } from './publishers/publisher.service';
import { SessionStorage } from './modules/core/storage/storage.decorator';
import { KeyValuePair, Dictionary  } from './modules/core/datastructures/data.dictionary';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [
    PublisherService
  ],
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent extends BaseComponent { 

    public title:string = 'Tour of Heroes';
    public requestLogin:boolean = false;
    public user:LoggedInUser = new LoggedInUser();

    constructor (protected authService: AuthService, private publisherService: PublisherService) {
      super(authService);
    }

    protected get postSignIn(): (firebaseUser:any) => void {
      return (usr) => {
        this.user.displayName = usr.displayName;
        this.user.photoUrl = usr.photoURL;
      };
    }

    signOut(): void {
      this.authService.signOut()
        .catch( err => {
          console.error(`Error: ${err}`);
        })
        .then( resolve => {
          console.log('User logged out successfully');
        })
      this.requestLogin = false;
    }

    ngOnInit(): void {
      if(!this.publisherColors) {
          this.publisherService.getPage()
          .subscribe(publishers => {
            let colorDict = new Dictionary<string, string> ();
              colorDict.addRange(_.map(publishers, p => new KeyValuePair(p.id, p.colorCode)));
              this.publisherColors = colorDict;
          });
      }
      super.ngOnInit();
    }
}
