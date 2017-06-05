import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'; 
import { HttpModule }    from '@angular/http';

import { CoreModule } from './modules/core/core.module';
import { UxModule } from './modules/ux/ux.module';
import { ConfigModule } from './modules/config/config.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { AppRoutingModule } from './app.routing.module';


import { AppComponent }  from './app.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

import { PublisherComponent } from './publishers/publisher.component';
import { PublishersComponent } from './publishers/publishers.component';
import { PublisherDetailComponent } from './publishers/publisher.detail.component';
import { PublisherHeroesComponent } from './publishers/publisher.heroes.component';
import { HeroComponent }  from './heroes/hero.component';
import { HeroesComponent }  from './heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero.detail.component';
import { HeroBackgroundComponent } from './heroes/hero.background.component';
import { HeroPowersComponent } from './heroes/hero.powers.component';
import { HeroQuotesComponent } from './heroes/hero.quotes.component';
import { HeroesSearchComponent }  from './heroes/heroes.query.component';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
    ReactiveFormsModule,
    HttpModule,
  	AppRoutingModule,
    CoreModule.forRoot(),
    ConfigModule.forRoot(),
    FirebaseModule.forRoot(),
    CoreModule.forRoot(),
    UxModule.forRoot()
    // Lets not do angularfire2 for sometime - some issues in setting up auth & db
    //AngularFireModule.initializeApp(appConfig.Config.firebase),
    
  ],
  declarations: [ 
	  AppComponent, 
	  DashboardComponent,
	  HeroesComponent, 
	  HeroComponent,
    HeroDetailComponent,
    HeroBackgroundComponent,
    HeroPowersComponent,
    HeroQuotesComponent,
    HeroesSearchComponent,
    PublishersComponent,
    PublisherComponent,
    PublisherDetailComponent,
    PublisherHeroesComponent
  ],
  providers: [
    
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
