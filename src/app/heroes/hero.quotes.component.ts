import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './../modules/core/base/base.component';
import { AuthService } from './../modules/core/auth/auth.service';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';
import { NavigationService } from './../modules/core/navigations/navigation.service';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { HeroQuote, QuoteEmotion } from './hero.quote.model';
import * as _ from 'lodash';
import { KeyValuePair } from './../modules/core/datastructures/data.dictionary';
import { ToastrService } from './../modules/ux/toastr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-hero-powers',
  templateUrl: './hero.quotes.component.html',
  styleUrls: [ './hero.common.component.css' ],
  providers: [
  ]
})
export class HeroQuotesComponent extends BaseComponent  {
    canAdd:boolean=false;
    quoteEmotions:KeyValuePair<string,string>[] = [];
    hero:Hero;
    newQuote:HeroQuote = { id: '', name: '', emotion: QuoteEmotion.normal  }

    quotes:any[];
    heroChange:Subscription;

    confirmDelete:boolean;
    todelete:string;

    constructor(protected authService: AuthService, private heroService: HeroService, private toastrService:ToastrService,
        private navigationService:NavigationService, public domsanitizer: DomSanitizer,  private location: Location) {
        super(authService);
    }

    restofColors(quote:any):KeyValuePair<string,string>[] {
        return _.reject(this.quoteEmotions, emo => emo.key == quote.emotion);
    }

    loadQuotes():void {
        this.heroService.getQuotes(this.hero.id)
            .subscribe(quotes => {
                this.quotes = _.map(quotes, q => {
                    return { id: q.id, name: q.name, emotion: q.emotion, canEdit: false }
                });
                this.toastrService.showSuccess('Quotes loaded successfully');
            });
    }

    undo(quote:any) {
        quote.canEdit = false;
    }

    add():void {
        this.toastrService.showInfo('Adding new quote');
        this.heroService.spawnQuote(this.hero.id, this.newQuote)
                .then(quote => {
                    this.quotes.push({ id: quote.id, name: quote.name, emotion: quote.emotion, canEdit: false });
                    this.canAdd = false;
                    this.newQuote.emotion = QuoteEmotion.normal;
                    this.newQuote.name = '';
                    this.loadQuotes();
                    this.toastrService.showSuccess('Quote added successfully');
                }).catch(err => this.handleError(err))
    }

    save(quote:any, emotion:QuoteEmotion) {
        this.toastrService.showInfo('Updating quote');
        this.heroService.stockQuote(this.hero.id, { id: quote.id, emotion: emotion, name: quote.name })
            .then(res => {
                quote.emotion = emotion;
                quote.canEdit = false;
                this.toastrService.showSuccess('Quote updated successfully');
            })
    }

    disagreeDelete(): void {
        this.confirmDelete = false;
        this.todelete = null;
    }

    agreenDelete(): void {
        this.toastrService.showInfo('Deleting quote');
        this.heroService.trashQuote(this.hero.id, this.todelete)
            .then(res => {
                this.quotes = _.reject(this.quotes, quo => quo.id == this.todelete);
                this.toastrService.showSuccess('Quote deleted successfully');
                this.confirmDelete = false;
                this.todelete = null;
            });
    }


    delete(id:string) {
        this.confirmDelete = true;
        this.todelete = id;
    }

    ngOnInit(): void {

      this.heroChange = this.heroService.heroChangeAnnounced$.subscribe(hero => {
          this.hero = hero;

          this.navigationService.navigationAnnounce(BreadCrumbScope.heroQuotes, this.hero.id, this.hero.name);
          this.navigationService.menuChangeAnnounce(MenuScope.hero, this.hero.id, this.hero.name);
          this.toastrService.showInfo('Loading Quotes');
          this.loadQuotes();
      });

      _.each(QuoteEmotion, e=> {
          if (QuoteEmotion.hasOwnProperty(e) && !/^\d+$/.test(e)) {
                this.quoteEmotions.push({ key: QuoteEmotion[e], value: e});
           }
      });

      super.ngOnInit();
    }

    ngOnDestroy() {
        this.heroChange.unsubscribe();
        super.ngOnDestroy();
    }
}
