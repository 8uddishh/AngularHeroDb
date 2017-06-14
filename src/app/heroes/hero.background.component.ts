import { Component, OnInit } from '@angular/core';
import { Subject }           from 'rxjs/Subject';

import { BaseComponent } from './../modules/core/base/base.component';
import { AuthService } from './../modules/core/auth/auth.service';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';
import { NavigationService } from './../modules/core/navigations/navigation.service';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';
import { Location } from '@angular/common';
import { HeroStory, TemplateType } from './hero.story.model';
import * as _ from 'lodash';
import { ToastrService } from './../modules/ux/toastr.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'my-hero-background',
  templateUrl: './hero.background.component.html',
  styleUrls: [
      './hero.common.component.css',
      './hero.background.component.css'
  ],
  providers: [
  ]
})
export class HeroBackgroundComponent extends BaseComponent  {
    canAdd:boolean=false;
    heroChange:Subscription;
    cursorchange: Subscription;
    hero:Hero;
    newStory:HeroStory = { id: '', title: '', story:'', templateType: TemplateType.leftimage, coordinates: { x: 0, y: 0}, imageUrl: ''  }

    stories:any[];
    selectedStory:any;
    mouseMoved$ = new Subject<any>();

    left$ = Observable.interval(100);
    leftSubscribe:Subscription;
    right$ = Observable.interval(100);
    rightSubscribe:Subscription;
    top$ = Observable.interval(100);
    topSubscribe:Subscription;
    bottom$ = Observable.interval(100);
    bottomSubscribe:Subscription;

    public todelete:string;
    confirmDelete:boolean = false;

    constructor(protected authService: AuthService, private heroService: HeroService, private toastrService:ToastrService,
        private navigationService:NavigationService, private location: Location) {
        super(authService);
    }

    loadStories():void {
        this.heroService.getStories(this.hero.id)
            .subscribe(stories => {
                this.stories = _.map(stories, s => {
                    return { id: s.id, title: s.title, story: s.story, templateType:s.templateType, 
                        underEdit: false, coordinates: s.coordinates, file: null, isImagechange:false, imageUrl: s.imageUrl }
                });
                this.toastrService.showSuccess('Stories loaded successfully');
            });
    }

    ImageClick(story:any) {
        this.selectedStory = story;
    }

    cancelAdd():boolean {
        this.canAdd = false;
        this.newStory.templateType = TemplateType.leftimage;
        this.newStory.title = '';
        this.newStory.story = '';
        return false;
    }

    add():void {
        this.toastrService.showInfo('Adding new story');
        this.heroService.spawnStory(this.hero.id, this.newStory)
                .then(story => {
                    this.stories.push({ id: story.id, title: story.title, story: story.story, templateType:story.templateType, 
                        underEdit: false, coordinates: { x: 0, y: 0}, file: null, isImagechange:false   });
                    this.canAdd = false;
                    this.newStory.templateType = TemplateType.leftimage;
                    this.newStory.title = '';
                    this.newStory.story = '';
                    this.loadStories();
                    this.toastrService.showSuccess('Story added successfully');
                }).catch(err => this.handleError(err))
    }

    save(story:any):void {
        this.toastrService.showInfo('Saving story...');
        this.heroService.stockStory(this.hero.id, {id: story.id, title: story.title, story: story.story, 
            templateType:story.templateType, coordinates: story.coordinates, imageUrl: story.imageUrl})
            .then(res => {
                story.underEdit = false;
                this.toastrService.showSuccess('Story saved successfully');
            })
    }

    storyPicChange(file:any) {
       this.selectedStory.coordinates = { x: 0, y: 0};
       this.selectedStory.file = file;
       this.selectedStory.imageUrl = URL.createObjectURL(this.selectedStory.file);
    }

    addImage(story:any) {
        let $task = this.heroService.changeStoryImage(this.hero.id, story.id, story.file)

        $task.on('state_changed', (snap:any) => {

        }, (err)=> {
            story.file = null;
            story.imageUrl = '';
            this.toastrService.showError('Story image could not be updated');
        }, () => {
            story.imageUrl = $task.snapshot.downloadURL;
            story.file = null;
            this.save(story);
        });
    }

    disagreeDelete(): void {
        this.confirmDelete = false;
        this.todelete = null;
    }

    agreenDelete(): void {
        this.toastrService.showInfo('Removing Story...');
        this.heroService.trashStory(this.hero.id, this.todelete)
            .then(resp => {
                this.stories = _.reject(this.stories, s => s.id == this.todelete);
                this.toastrService.showSuccess('Story removed successfully');
                this.confirmDelete = false;
                this.todelete = null;
            });
    }

    remove(id:string) {
        this.todelete = id;
        this.confirmDelete = true;
    }

    moveleftenter(story:any):void {
        this.leftSubscribe = this.left$.subscribe(x => {
            story.coordinates.x +=5;
        })
    }

    moveleftleave():void {
        this.leftSubscribe.unsubscribe();
    }

    moverightenter(story:any):void {
        this.rightSubscribe = this.right$.subscribe(x => {
            story.coordinates.x -=5;
        })
    }

    moverightleave():void {
        this.rightSubscribe.unsubscribe();
    }

    movetopenter(story:any):void {    
        this.topSubscribe = this.top$.subscribe(x => {
            story.coordinates.y +=5;
        })
    }

    movetopleave():void {
        this.topSubscribe.unsubscribe();
    }

    movebottomenter(story:any):void {
        this.bottomSubscribe = this.bottom$.subscribe(x => {
            story.coordinates.y -=5;
        })
    }

    movebottomleave():void {
        this.bottomSubscribe.unsubscribe();
    }

    ngOnInit(): void {

      this.heroChange = this.heroService.heroChangeAnnounced$.subscribe(hero => {

        this.hero = hero;
        this.navigationService.navigationAnnounce(BreadCrumbScope.heroBackground, this.hero.id, this.hero.name);
        this.navigationService.menuChangeAnnounce(MenuScope.hero, this.hero.id, this.hero.name);
        this.toastrService.showInfo('Loading Stories...');
        this.loadStories();
      });

      super.ngOnInit();
    }

    ngOnDestroy() {
        this.heroChange.unsubscribe();
        super.ngOnDestroy();
    }
}
