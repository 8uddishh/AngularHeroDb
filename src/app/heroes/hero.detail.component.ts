import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';
import { Hero } from './hero.model';
import { PublisherService } from './../publishers/publisher.service';
import { Publisher } from './../publishers/publisher.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { ToastrService } from './../modules/ux/toastr.service';
import { NavigationService } from './../modules/core/navigations/navigation.service';
import { HeroService } from './hero.service';
import { BaseComponent } from './../modules/core/base/base.component';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero.detail.component.html',
  styleUrls: [
    './hero.detail.component.css'
  ],
  providers: [
  ]
})
export class HeroDetailComponent extends BaseComponent  {
    heroChange:Subscription;
    hero: Hero;
    file:any = null;
    isLogoChange:boolean = false;
    publisherName:string;

    heroForm: FormGroup = new FormGroup({
        id: new FormControl(),
        name: new FormControl(),
        publisherId: new FormControl(),
        realName: new FormControl(),
        about: new FormControl()
    });

  publishers: Publisher[];

    constructor(protected authService: AuthService, private heroService: HeroService, private publisherService: PublisherService,
    private navigationService:NavigationService, private toastrService:ToastrService, 
    private route: ActivatedRoute, private location: Location) {
      super(authService);
    }

    goBack(): void {
    this.location.back();
  }

  submit(): void {
    let previousPublisherId = this.hero.publisherId;
    let formValue = this.heroForm.value;
    this.hero.name = formValue.name;
    this.hero.publisherId = formValue.publisherId;
    this.hero.realName = formValue.realName;
    this.hero.about = formValue.about;

    this.save(this.heroForm.controls['publisherId'].dirty, previousPublisherId);
  }

  save(publisherChanged:boolean, origPublisherId?:string): void {
    this.heroService.stockSingle(this.hero)
          .then(response => {
              //do this only when needed -- check for select is pristine
              return publisherChanged ? this.heroService.mapPublisher(this.hero, origPublisherId) as Promise<Hero>
              : new Promise<Hero>((resolve, reject) => {
                resolve(this.hero);
              });
          }).then((hero:Hero) => {
              this.file = null;
              this.toastrService.showSuccess('Hero saved successfully');
              this.heroForm.markAsPristine();
          });
  }

  logoChange(file: any): void {
    this.file = file;
     this.hero.logoUrl = URL.createObjectURL(this.file);
  }

  coverPicChange(file: any): void {
     this.file = file;
     this.hero.coverPicUrl = URL.createObjectURL(this.file);
  }

  fileError(msg:string): void {

  }

  clearImage():void {
    this.file = null;
  }

  addImage(): void {
    this.toastrService.showInfo('Changing image for hero...');
    let $task = this.heroService.changeImage(this.hero.id, this.file, this.isLogoChange);
    
    $task.on('state_changed', (snap:any) => {

    }, (err)=> {
      this.file = null;
      this.toastrService.showError('Hero image could not be updated');
    }, () => {
      if(this.isLogoChange)
        this.hero.logoUrl = $task.snapshot.downloadURL;
      else 
        this.hero.coverPicUrl = $task.snapshot.downloadURL;
      this.save(false);
    });
  }

    ngOnInit(): void {

      this.heroChange = this.heroService.heroChangeAnnounced$.subscribe(
        hero => {
          
          if(_.every(['powers', 'quotes', 'background'], r => !this.location.path().endsWith(r))) {
            
            this.hero = hero;
            this.heroForm.controls['id'].setValue(this.hero.id);
            this.heroForm.controls['name'].setValue(this.hero.name);
            this.heroForm.controls['publisherId'].setValue(this.hero.publisherId);
            this.heroForm.controls['realName'].setValue(this.hero.realName);
            this.heroForm.controls['about'].setValue(this.hero.about);
            this.heroForm.markAsPristine();

            this.publisherService.getPage()
              .subscribe(publishers => {
                this.publishers = publishers;
                this.changePublisher();
              });

            this.navigationService.navigationAnnounce(BreadCrumbScope.hero, this.hero.id, this.hero.name);
            this.navigationService.menuChangeAnnounce(MenuScope.hero, this.hero.id, this.hero.name);
          }
          
      });

      super.ngOnInit();
    }

    changePublisher() {
      this.publisherName = _.find(this.publishers, p => p.id == this.hero.publisherId).name;
    }

    ngOnDestroy() {
        this.heroChange.unsubscribe();
        super.ngOnDestroy();
    }

}