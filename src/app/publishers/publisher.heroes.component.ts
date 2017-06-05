import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';

import { Color } from './../modules/ux/components/color';
import { Publisher } from './publisher.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { PublisherService } from './publisher.service';
import { NavigationService } from './../modules/core/navigations/navigation.service';
import { ToastrService } from './../modules/ux/toastr.service';
import { BaseComponent } from './../modules/core/base/base.component';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';
import { Subscription } from 'rxjs';

import { HeroesComponent } from './../heroes/heroes.component';
import { HeroService } from './../heroes/hero.service';

@Component({
  selector: 'my-publisher-heroes',
  providers: [  
      HeroService
    //Note that the providers are empty, this is to use the parent providers for the subscription
  ],
  templateUrl: './../heroes/heroes.component.html',
    styleUrls: [ 
      './../heroes/heroes.component.css'
    ]
})
export class PublisherHeroesComponent extends HeroesComponent  {
    
    publisher:Publisher;
    publisherChange:Subscription;

  constructor(protected authService: AuthService, protected heroService: HeroService, protected publisherService: PublisherService,
    protected navigationService:NavigationService, protected toastrService:ToastrService, protected router:Router) {
        super(authService, heroService, publisherService, navigationService, toastrService, router);
    }

    ngOnInit(): void {

        this.publisherChange = this.publisherService.publisherhangeAnnounced$.subscribe(
            publisher => {
            this.publisher = publisher;
            this.navigationService.navigationAnnounce(BreadCrumbScope.publisherHeroes, this.publisher.id, this.publisher.name);
            this.navigationService.menuChangeAnnounce(MenuScope.publisher, this.publisher.id, this.publisher.name);


            this.toastrService.showInfo('Loading heroes...');
                this.heroService.getPageForPublisher(this.publisher.id)
                    .subscribe( heroes => {
                        this.heroes = heroes;
                        this.toastrService.showSuccess('Heroes loaded successfully');
                    });

            this.publisherService.getPage()
                    .subscribe(publishers => {
                    this.publishers = publishers;
                });
            this.newHero.publisherId = this.publisher.id;
        });

        

        super.baseInit();
    }

    ngOnDestroy() {
        this.publisherChange.unsubscribe();
        super.ngOnDestroy();
    }
}