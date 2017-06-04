import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Hero } from './hero.model';
import { PublisherService } from './../publishers/publisher.service';
import { AuthService } from './../modules/core/auth/auth.service';
import { HeroService } from './hero.service';
import { BaseComponent } from './../modules/core/base/base.component';

@Component({
  selector: 'my-hero',
  templateUrl: './hero.component.html',
  providers: [
    HeroService,
    PublisherService
  ]
})
export class HeroComponent extends BaseComponent  {
  hero: Hero;

  constructor(protected authService: AuthService, private heroService: HeroService, private router:Router,
    private route: ActivatedRoute) {
      super(authService);
  }

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => this.heroService.getSingle(params['id']))
            .subscribe(hero => {
               this.hero = hero; 
                if(!this.hero.publisherId) 
                  this.hero.publisherId = '';
                if(!this.hero.realName) 
                  this.hero.realName = '';
                if(!this.hero.about) 
                  this.hero.about = '';

                this.heroService.heroChangeAnnounce(this.hero);
            });
        
        this.router.events.forEach((event) => {
            if(event instanceof NavigationEnd) {
              // matching url tocheck if this is a child url then propagate hero
              let matcher = (event as NavigationEnd).url.match(/Heroes[/][a-zA-z-0-9]*/i);
              if(matcher && matcher.length > 0)
              {
                  if(this.hero)
                  this.heroService.heroChangeAnnounce(this.hero);
              }
                
            }
        });
        super.ngOnInit();
  }
  
}