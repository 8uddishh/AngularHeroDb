import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';

import { Color } from './../modules/ux/components/color';
import { Publisher } from './publisher.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { ToastrService } from './../modules/ux/toastr.service';
import { PublisherService } from './publisher.service';
import { NavigationService } from './../modules/core/navigations/navigation.service';

import { BaseComponent } from './../modules/core/base/base.component';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';

@Component({
  selector: 'my-publisher',
  providers: [
    PublisherService
  ],
  templateUrl: './publisher.component.html',
    styleUrls: [ 
      './publisher.component.css'
    ]
})
export class PublisherComponent extends BaseComponent  {
  publisher: Publisher;
  file:any = null;
  isLogoChange:boolean = false;

  constructor(protected authService: AuthService, private publisherService: PublisherService, private navigationService:NavigationService,
    private toastrService:ToastrService, private route: ActivatedRoute, private location: Location, public domsanitizer: DomSanitizer) {
      super(authService);
  }

  ngOnInit(): void {

        super.ngOnInit();

        this.route.params.switchMap((params: Params) => this.publisherService.getSingle(params['id']))
            .subscribe(publisher => {
              this.publisher = publisher;

              this.navigationService.navigationAnnounce(BreadCrumbScope.publisher, this.publisher.id, this.publisher.name);
              this.navigationService.menuChangeAnnounce(MenuScope.publisher, this.publisher.id, this.publisher.name);
            });

        
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
      this.publisherService.stockSingle(this.publisher)
          .then( response => {
              this.file = null;
              this.toastrService.showSuccess('Publisher saved successfully');
          });
  }

  logoChange(file: any): void {
    this.file = file;
     this.publisher.logoUrl = URL.createObjectURL(this.file);
  }

  coverPicChange(file: any): void {
     this.file = file;
     this.publisher.coverPicUrl = URL.createObjectURL(this.file);
  }

  fileError(msg:string): void {

  }

  clearImage():void {
    this.file = null;
  }

  selectColor(color:Color): void {
      this.publisher.colorCode = color.colorCode;
  }

  addImage(): void {
    this.toastrService.showInfo('changing image for publisher...');
    var $task = this.publisherService.changeImage(this.publisher.id, this.file, this.isLogoChange);
    
    $task.on('state_changed', (snap:any) => {

    }, (err)=> {
      this.file = null;
      this.toastrService.showError('Publisher image could not be updated');
    }, () => {
      if(this.isLogoChange)
        this.publisher.logoUrl = $task.snapshot.downloadURL;
      else 
        this.publisher.coverPicUrl = $task.snapshot.downloadURL;
      this.save();
    });
  }
}