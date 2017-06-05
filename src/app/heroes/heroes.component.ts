import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import * as _ from 'lodash';

import { Hero } from './hero.model';
import { ToastrService } from './../modules/ux/toastr.service';
import { PublisherService } from './../publishers/publisher.service';
import { Publisher } from './../publishers/publisher.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { HeroService } from './hero.service';
import { BaseComponent } from './../modules/core/base/base.component';

import { NavigationService } from './../modules/core/navigations/navigation.service';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';

@Component({
  selector: 'my-heroes',
  providers: [
    HeroService,
    PublisherService
  ],
  templateUrl: './heroes.component.html',
    styleUrls: [ 
      './heroes.component.css'
    ]
})
export class HeroesComponent extends BaseComponent {
  public heroes: Hero[];
  
  public canSave: boolean = false;

  publisher:Publisher;
  publishers: Publisher[];

  public newHero: Hero = { name: '', publisherId: '' } as Hero;

  constructor(protected authService: AuthService, protected heroService: HeroService, protected publisherService: PublisherService,
    protected navigationService:NavigationService, protected toastrService:ToastrService, protected router:Router) {
    super(authService);
  }

  view(hero: Hero): void {
        this.router.navigate(['/heroes',  hero.id]);
  }

  add(): void {
      this.toastrService.showInfo('Creating new hero...');
        this.heroService.spawnSingle(this.newHero)
            .then(hero => {
                return this.heroService.mapPublisher(hero);
            }).then((hero:Hero) => {
                this.heroes.push(hero);
                this.clear();
                this.toastrService.showSuccess('Hero created successfully');
            });
  }

  clear(): void {
      console.log(this.newHero);
        this.newHero.name = '';
        this.newHero.publisherId = '';
        this.canSave = false;
    }

  delete(hero:Hero): void {
        this.toastrService.showInfo('Removing hero');
        this.heroService.trashSingle(hero)
            .then( response => {
                if(hero.publisherId)
                  return this.heroService.deletePublisherMap(hero);
                else 
                  new Promise<Hero>((resolve, reject) => {
                    resolve(hero);
                  });
            }).then(response => {
                this.heroes = this.heroes.filter( p => p.id != hero.id);
                this.toastrService.showSuccess('Hero removed successfully');
            });
    }

    baseInit():void {
      super.ngOnInit();
    }

    ngOnInit(): void {
      this.baseInit();

      this.toastrService.showInfo('Loading heroes...');
          this.heroService.getPage()
              .subscribe( heroes => {
                  this.heroes = heroes;
                  this.toastrService.showSuccess('Heroes loaded successfully');
              });

      this.publisherService.getPage()
            .subscribe(publishers => {
              this.publishers = publishers;
            });
      
      this.navigationService.navigationAnnounce(BreadCrumbScope.heroes);    
      this.navigationService.menuChangeAnnounce(MenuScope.parent);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}