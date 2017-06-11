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

import { HeroService } from './../heroes/hero.service';
import { ComicsComponent } from './../comics/comics.component';
import { ComicService } from './../comics/comic.service';

@Component({
  selector: 'my-publisher-comics',
  providers: [  
      HeroService,
      ComicService
    //Note that the providers are empty, this is to use the parent providers for the subscription
  ],
  templateUrl: './../comics/comics.component.html',
    styleUrls: [ 
      './../comics/comics.component.css'
    ]
})
export class PublisherComicsComponent extends ComicsComponent  {
    
    publisher:Publisher;
    publisherChange:Subscription;

  constructor(protected authService: AuthService, protected comicService:ComicService, protected heroService: HeroService, 
    protected publisherService: PublisherService, protected navigationService:NavigationService, protected toastrService:ToastrService, 
    protected router:Router) {
        super(authService, comicService, heroService, publisherService, navigationService, toastrService, router);
    }

    ngOnInit(): void {

        this.publisherChange = this.publisherService.publisherhangeAnnounced$.subscribe(
            publisher => {
            this.publisher = publisher;
            this.navigationService.navigationAnnounce(BreadCrumbScope.publisherComics, this.publisher.id, this.publisher.name);
            this.navigationService.menuChangeAnnounce(MenuScope.publisher, this.publisher.id, this.publisher.name);

            this.publisherChanged(this.publisher.id)

            this.toastrService.showInfo('Loading comics...');
                this.comicService.getPageForPublisher(this.publisher.id)
                    .subscribe( comics => {
                        this.comics = comics;
                        this.toastrService.showSuccess('Comics loaded successfully');
                    });

            this.publisherService.getPage()
                    .subscribe(publishers => {
                    this.publishers = publishers;
                });

            this.newComic.publisherId = this.publisher.id;
        });

        super.baseInit();
    }

    ngOnDestroy() {
        this.publisherChange.unsubscribe();
        super.ngOnDestroy();
    }
}