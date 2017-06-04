import { Component } from '@angular/core';
import * as _ from 'lodash';
import "rxjs/add/operator/filter";

import { LoggedInUser } from './../login/login.user.model';
import { AuthService } from './../auth/auth.service';
import { BaseComponent } from './../base/base.component';

import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { BreadCrumbModel } from './breadcrumb.model';

import { NavigationService } from './navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-bread-crumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [
    './breadcrumb.component.css'
  ]
})
export class BreadcrumbComponent extends BaseComponent { 
    
    breadcrumbChange:Subscription;
    breadcrumbs: BreadCrumbModel[];
    public user:LoggedInUser = new LoggedInUser();

    constructor (protected authService: AuthService, private navigationService:NavigationService, private router:Router, private route: ActivatedRoute) {
      super(authService);
    }

    ngOnInit(): void {

      this.breadcrumbChange = this.navigationService.navigationAnnounced$.subscribe(
        breadcrumbs => {
          this.breadcrumbs = breadcrumbs;
      });

      super.ngOnInit();
    }

    ngOnDestroy() {
        this.breadcrumbChange.unsubscribe();
        super.ngOnDestroy();
    }
}