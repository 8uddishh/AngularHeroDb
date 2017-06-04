import { Component, OnInit } from '@angular/core';

import { Hero } from './../heroes/hero.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { ToastrService } from './../modules/ux/toastr.service';
import { HeroService } from './../heroes/hero.service';
import { BaseComponent } from './../modules/core/base/base.component';

import { NavigationService } from './../modules/core/navigations/navigation.service';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  /*styleUrls: [
  	'./dashboard.component.css'
  ],*/
  providers: [
    HeroService
  ],
})
export class DashboardComponent extends BaseComponent {
  heroes: Hero[] = [];

  constructor(protected authService: AuthService, private heroService:HeroService, 
    private navigationService:NavigationService, private toastrService:ToastrService) { 
    super(authService);
  }
  
  ngOnInit(): void {
    super.ngOnInit();
    this.heroService.Limit(4)
      .subscribe( heroes => {
                this.heroes = heroes;
                this.toastrService.showSuccess('Trending heroes loaded successfully');
            });

    this.navigationService.navigationAnnounce(BreadCrumbScope.home);
    this.navigationService.menuChangeAnnounce(MenuScope.parent);
  }
}
