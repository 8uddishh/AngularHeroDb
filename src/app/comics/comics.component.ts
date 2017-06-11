import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import * as _ from 'lodash';

import { Comic } from './comic.model'
import { Hero } from './../heroes/hero.model';
import { ToastrService } from './../modules/ux/toastr.service';
import { PublisherService } from './../publishers/publisher.service';
import { Publisher } from './../publishers/publisher.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { HeroService } from './../heroes/hero.service';
import { BaseComponent } from './../modules/core/base/base.component';

import { NavigationService } from './../modules/core/navigations/navigation.service';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';
import { ComicService } from './comic.service'

@Component({
  selector: 'my-comics',
  providers: [
    HeroService,
    PublisherService,
    ComicService
  ],
  templateUrl: './comics.component.html',
    styleUrls: [ 
      './comics.component.css'
    ]
})
export class ComicsComponent extends BaseComponent {
  
  publishers: Publisher[];
  heroes: Hero[];
  comics:Comic[] = [];
  canSave: boolean = false;
  publisher:Publisher;
  hero:Hero;
  confirmDelete:boolean = false;
  todelete:Comic;

  public newComic: Comic = { name: '', thumbnailUrl: '', publisherId: '', heroIds: [], synopsis:'' } as Comic;

  constructor(protected authService: AuthService, protected comicService:ComicService, protected heroService: HeroService, 
    protected publisherService: PublisherService, protected navigationService:NavigationService, protected toastrService:ToastrService, 
    protected router:Router) {
    super(authService);
  }

  view(comic: Comic): void {
        this.router.navigate(['/comics',  comic.id]);
  }

  add(): void {
    this.toastrService.showInfo('Creating new comic...');
    let toAdd = _.cloneDeep(this.newComic);
    this.comicService.spawnComic(this.newComic)
      .then(comicId => {
        toAdd.id = comicId;
        return this.comicService.mapHeroes(toAdd, []);
      }).then(comic => {
        return this.comicService.mapPublisher(toAdd);
      }).then(comic => {
        this.comics.push(toAdd);
        this.clear();
        this.toastrService.showSuccess('Comic created successfully');
      });
  }

  clear(): void {
        this.newComic.name = '';
        this.newComic.publisherId = '';
        this.newComic.heroIds = [];
        this.newComic.synopsis = '';
        this.canSave = false;
    }
  
  disagreeDelete():void {
      this.todelete = null;
      this.confirmDelete = false;
  }

  agreenDelete():void {
      this.toastrService.showInfo('Removing comic...');
      this.comicService.trashSingle(this.todelete)
          .then(response => {
            return this.comicService.deletePublisherMap(this.todelete)
          }).then(comic => {
            return this.comicService.deleteHeroesMap(this.todelete)
          }).then(comic => {
            this.todelete = null;
            this.confirmDelete = false;
            this.comics = _.reject(this.comics, c => c.id == comic.id);
            this.toastrService.showSuccess('Comic removed successfully');
          });
  }

  delete(comic:Comic): void {
    this.confirmDelete = true;
    this.todelete = _.cloneDeep(comic);
  }

    baseInit():void {
      super.ngOnInit();
    }

    publisherChanged(id:string):void {
        this.heroService.getPageForPublisher(id)
            .subscribe(heroes => {
              this.heroes = heroes;
            });
    }

    ngOnInit(): void {
      super.ngOnInit();

      this.publisherService.getPage()
            .subscribe(publishers => {
              this.publishers = publishers;
            });
      
      this.comicService.getPage()
          .subscribe(comics => {
            this.comics = comics;
          });

      this.navigationService.navigationAnnounce(BreadCrumbScope.comics);    
      this.navigationService.menuChangeAnnounce(MenuScope.parent);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}