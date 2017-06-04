import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AuthService } from './../modules/core/auth/auth.service';
import { HeroService } from './hero.service';
import { BaseComponent } from './../modules/core/base/base.component';
import { Hero } from './hero.model';
@Component({
  selector: 'my-hero-search',
  templateUrl: './heroes.query.component.html',
  styleUrls: [ './heroes.query.component.css' ]
})
export class HeroesSearchComponent extends BaseComponent {

  heroes$: Observable<Hero[]>;
  heroes: Hero[];
  private searchTerms = new Subject<string>();

  constructor(protected authService: AuthService, private heroService: HeroService, private router: Router) {
    super(authService);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    //There should be a better way than below... It works though !!! 
    //The actual angular2 code uses a switch map on returned promise.. in our case its an event and Angular doesn't seem to bind the observables
    // when creating Observable uding from event and convert to array... I'm missing something here...

    this.searchTerms
      .debounceTime(300)        
      .distinctUntilChanged()
      .subscribe( term => {
        this.heroes = [];
        if(term)
          this.heroService.startsWith(term).subscribe(hero => {
            this.heroes.push(hero as Hero);   
            console.log(this.heroes);
            this.heroes$ = Observable.of(this.heroes);
          });
        else 
          this.heroes$ = Observable.of(this.heroes);
      }); 
  }

  gotoDetail(hero: Hero): void {
    this.router.navigate(['/heroes', hero.id]);
  }

}