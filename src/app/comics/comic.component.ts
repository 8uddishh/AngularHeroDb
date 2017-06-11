import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';
import { Comic } from './comic.model';
import { Hero } from './../heroes/hero.model';
import { HeroService } from './../heroes/hero.service';
import { PublisherService } from './../publishers/publisher.service';
import { Publisher } from './../publishers/publisher.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { ToastrService } from './../modules/ux/toastr.service';
import { NavigationService } from './../modules/core/navigations/navigation.service';
import { ComicService } from './comic.service';
import { BaseComponent } from './../modules/core/base/base.component';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-comic-detail',
  templateUrl: './comic.component.html',
  styleUrls: [
    './comic.component.css'
  ],
  providers: [
    HeroService,
    PublisherService,
    ComicService
  ]
})
export class ComicComponent extends BaseComponent  {

    heroesLoaded:boolean = false;
    tabscope:string = 'detail';
    publishers:Publisher[];
    heroes:Hero[];
    comic:Comic;
    file:any;
    isthumbnailChange:boolean = false;
    comicHeroes: Hero[] = [];


    originalPublisherId: string;
    originalHeroIds: string[];
    confirmSave:boolean = false;
    canManage:boolean = false;

    constructor(protected authService: AuthService, private heroService: HeroService, private publisherService: PublisherService,
        private comicService:ComicService, private navigationService:NavigationService, private toastrService:ToastrService, 
        public domsanitizer: DomSanitizer, private route: ActivatedRoute, private location: Location) {
      super(authService);
    }

    comicPicChange(file:any):void {
       this.file = file;
       this.comic.thumbnailUrl = URL.createObjectURL(this.file);
    }

    loadHeroes(): void {
      this.comicHeroes = [];
      _.each(this.originalHeroIds, heroId => {
            this.heroService.getSingle(heroId)
              .subscribe(hero => {
                  this.comicHeroes.push(hero)
              });
        });
    }

    showHeroes():void {
      this.tabscope = 'heroes';
      if(!this.heroesLoaded) {
        this.loadHeroes();
        this.heroesLoaded = true;
      }
    }

    persist():void {
      this.comicService.stockComic(this.comic)
      .then(comicId => {
        return this.comicService.mapHeroes(this.comic, this.originalHeroIds);
      }).then(comic => {
        return this.comicService.mapPublisher(this.comic, this.originalPublisherId);
      }).then(comic => {
        this.toastrService.showSuccess('Comic saved successfully');
        this.file = null;
        if(this.originalPublisherId != this.comic.publisherId)
        this.originalPublisherId = this.comic.publisherId;
        if(this.originalHeroIds.length != this.comic.heroIds.length || 
          _.every(this.originalHeroIds, h => _.some(this.comic.heroIds, c => c != h)))
          {
              this.originalHeroIds = _.cloneDeep(this.comic.heroIds);
              console.log(this.originalHeroIds)
              this.loadHeroes();
          }
        this.canManage = false;
      });
    }

    saveHeroes():void {
      this.save(true);
    }

    publisherChange(id:string):void {
        this.heroService.getPageForPublisher(id)
            .subscribe(heroes => {
              this.heroes = heroes;
            });
        if(id == this.originalPublisherId) {
            this.comic.heroIds = _.cloneDeep(this.originalHeroIds);
        }
        else {
          this.comic.heroIds = [];
        }
    }

    agreenSave(): void {
      this.comic.heroIds = [];
      this.save(true);
      this.confirmSave = false;
    }

    disagreeSave(): void {
      this.confirmSave = false;
    }

    manageHeroes():void {
      this.canManage = true;
    }

    save(force?:boolean):void {
      
      if(this.originalPublisherId != this.comic.publisherId && !force) {
          this.confirmSave = true;
      }
      else {
          this.toastrService.showInfo('Saving comic...');
          if(this.file) {
            let $task = this.comicService.changeImage(this.comic.id, this.file);
            $task.on('state_changed', (snap:any) => {

              }, (err)=> {
                this.file = null;
                this.toastrService.showError('Comic image could not be updated');
              }, () => {
                  this.comic.thumbnailUrl = $task.snapshot.downloadURL;
                this.persist();
              });
          }
          else {
            this.persist()
          }
      }
    }

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.comicService.getSingle(params['id']))
            .subscribe(comic => {
               this.comic = comic;
                if(!this.comic.name) 
                  this.comic.name = '';
                if(!this.comic.publisherId) 
                  this.comic.publisherId = '';
                if(!this.comic.heroIds) 
                  this.comic.heroIds = [];
                if(!this.comic.thumbnailUrl) 
                  this.comic.thumbnailUrl = '';
                if(!this.comic.synopsis) 
                  this.comic.synopsis = '';

                this.publisherService.getPage()
                  .subscribe(publishers => {
                    this.publishers = publishers;
                  });
                this.originalPublisherId = this.comic.publisherId;
                this.originalHeroIds = _.cloneDeep(this.comic.heroIds);

                this.publisherChange(this.comic.publisherId);
            });

        this.navigationService.navigationAnnounce(BreadCrumbScope.comics);    
        this.navigationService.menuChangeAnnounce(MenuScope.parent);
    }

    ngOnDestroy() {
    }
}