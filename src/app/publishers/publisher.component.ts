import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Publisher } from './publisher.model';
import { AuthService } from './../modules/core/auth/auth.service';
import { PublisherService } from './publisher.service';
import { BaseComponent } from './../modules/core/base/base.component';

@Component({
  selector: 'my-publisher',
  providers: [
    PublisherService
  ],
  templateUrl: './publisher.component.html'
})
export class PublisherComponent extends BaseComponent  {
  publisher: Publisher;
  file:any = null;
  isLogoChange:boolean = false;

  constructor(protected authService: AuthService, private publisherService: PublisherService, private router:Router,
    private route: ActivatedRoute) {
      super(authService);
  }

  ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.publisherService.getSingle(params['id']))
            .subscribe(publisher => {
               this.publisher = publisher;
                if(!this.publisher.colorCode) 
                  this.publisher.colorCode = '';
                if(!this.publisher.companyInfo) 
                  this.publisher.companyInfo = '';
                if(!this.publisher.coverPicUrl) 
                  this.publisher.coverPicUrl = '';
                if(!this.publisher.logoUrl) 
                  this.publisher.logoUrl = '';
                if(!this.publisher.name) 
                  this.publisher.name = '';

                this.publisherService.publisherChangeAnnounce(this.publisher);
            });
        
        this.router.events.forEach((event) => {
            if(event instanceof NavigationEnd) {
              // matching url tocheck if this is a child url then propagate hero
              let matcher = (event as NavigationEnd).url.match(/Publishers[/][a-zA-z-0-9]*/i);
              if(matcher && matcher.length > 0)
              {
                  if(this.publisher)
                  this.publisherService.publisherChangeAnnounce(this.publisher);
              }
                
            }
        });
        super.ngOnInit();
  }
}