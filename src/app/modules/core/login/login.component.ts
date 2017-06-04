import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './../base/base.component'
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent extends BaseComponent {
    public isSignIn:boolean = true;

    constructor(protected authService: AuthService) { 
        super(authService);
    }

    signInWithGoogle (): void {
        this.authService.signInWithGoogle()
             .then( (firebaseUser) => {
                //console.log(firebaseUser.user.displayName);
                if(firebaseUser) {
                    this.userLoggedIn = true;
                    this.postSignIn(firebaseUser.user);
                }
                else {
                    this.userLoggedIn = false;
                }
            }, (err) => {
                console.error('Err:' + err);
            });

        // not displaying the option to select user profiles 
    }
}
