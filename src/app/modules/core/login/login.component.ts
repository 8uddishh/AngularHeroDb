import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './../base/base.component';
import { AuthService } from './../auth/auth.service';
import * as toastr from 'toastr';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent extends BaseComponent {
    public isSignIn:boolean = true;
    email:string;
    pass:string;

    registeremail:string;
    registerpass:string;
    registerConfpass:string;

    constructor(protected authService: AuthService) { 
        super(authService);
    }

    tabChange(scope:string):void {
        if(scope == 'login') {
            this.isSignIn = true;
            this.registeremail = '';
            this.registerpass = '';
            this.registerConfpass = '';
        }
        else {
            this.isSignIn = false;
            this.email = '';
            this.pass = '';
        }
    }

    signInWithGoogle (): void {
        this.authService.signInWithGoogle()
             .then( (firebaseUser) => {
                if(firebaseUser) {
                    this.userLoggedIn = true;
                    this.postSignIn(firebaseUser.user);
                    toastr.success('You are logged in', '', {
                        positionClass: 'toast-bottom-right'
                    });
                }
                else {
                    this.userLoggedIn = false;
                }
            }, (err) => {
                toastr.error('Could not login using the google account','', {
                    positionClass: 'toast-bottom-right'
                });
            });
    }

    signInWithFacebook (): void {
        this.authService.signInWithFacebook()
             .then( (firebaseUser) => {
                if(firebaseUser) {
                    this.userLoggedIn = true;
                    this.postSignIn(firebaseUser.user);
                    toastr.success('You are logged in', '', {
                        positionClass: 'toast-bottom-right'
                    });
                }
                else {
                    this.userLoggedIn = false;
                }
            }, (err) => {
                toastr.error('Could not login using the facebook account','', {
                    positionClass: 'toast-bottom-right'
                });
            });
    }

    signInWithTwitter (): void {
        this.authService.signInWithTwitter()
             .then( (firebaseUser) => {
                if(firebaseUser) {
                    this.userLoggedIn = true;
                    this.postSignIn(firebaseUser.user);
                    toastr.success('You are logged in', '', {
                        positionClass: 'toast-bottom-right'
                    });
                }
                else {
                    this.userLoggedIn = false;
                }
            }, (err) => {
                toastr.error('Could not login using the twitter account','', {
                    positionClass: 'toast-bottom-right'
                });
            });
    }

    signInWithEmailPassword ():void {
        if(this.email && this.pass)
        {
            if(this.email != '' && this.pass != '') {
                this.authService.signInWithEmail(this.email, this.pass)
                    .then( (firebaseUser) => {
                        if(firebaseUser) {
                            this.userLoggedIn = true;
                            this.postSignIn(firebaseUser.user);
                            toastr.success('You are logged in', '', {
                                positionClass: 'toast-bottom-right'
                            });
                        }
                        else {
                            this.userLoggedIn = false;
                        }
                    }, (err) => {
                        toastr.error(err.message,'', {
                            positionClass: 'toast-bottom-right'
                        });
                    });
                return;
            }
        }
        else {
            toastr.error('Email and password are mandatory for registration','', {
                    positionClass: 'toast-bottom-right'
                });
        }
    }

    registerEmailandPassword ():void {
        if(this.registeremail && this.registerpass && this.registerConfpass)
        {
            if(this.registeremail != '' && this.registerpass != '' && this.registerConfpass != '')
            {
                if(this.registerConfpass != this.registerpass){
                    toastr.error('Password and Confirm Password do not match','', {
                        positionClass: 'toast-bottom-right'
                    });
                    return;
                }
                this.authService.registerEmailandPassword(this.registeremail, this.registerpass)
                    .then((firebaseUser) => {
                        toastr.success('User created successfully.', '', {
                            positionClass: 'toast-bottom-right'
                        });
                    }, (err) => {
                        toastr.error(err.message,'', {
                            positionClass: 'toast-bottom-right'
                        });
                    });
                return;
            }
        }
        toastr.error('All fields are mandatory for registration','', {
                    positionClass: 'toast-bottom-right'
                });
        
    }
}
