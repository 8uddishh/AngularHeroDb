import { Component } from '@angular/core';
import * as _ from 'lodash'

import { LoggedInUser } from './../login/login.user.model';
import { AuthService } from './../auth/auth.service';
import { BaseComponent } from './../base/base.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavigationService } from './navigation.service';

import { MenuModel } from './menu.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent extends BaseComponent { 
    
    menuChange:Subscription;
    menuItems: MenuModel[];
    minLevel:number;
    public user:LoggedInUser = new LoggedInUser();

    constructor (protected authService: AuthService, private navigationService:NavigationService,  
        private router:Router, private route: ActivatedRoute) {
      super(authService);
    }

   ngOnInit(): void {
      this.menuChange = this.navigationService.menuChangeAnnounced$.subscribe(
        menuItems => {
          this.menuItems = menuItems;
          this.minLevel = _.minBy(this.menuItems, menu => menu.level).level;
      });

      super.ngOnInit();      
    }

    ngOnDestroy() {
        this.menuChange.unsubscribe();
        super.ngOnDestroy();
    }
}