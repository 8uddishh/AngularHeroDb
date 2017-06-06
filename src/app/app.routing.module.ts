import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { PublishersComponent } from './publishers/publishers.component';
import { PublisherComponent } from './publishers/publisher.component';
import { PublisherDetailComponent } from './publishers/publisher.detail.component';
import { PublisherHeroesComponent } from './publishers/publisher.heroes.component';
import { HeroesComponent }  from './heroes/heroes.component';
import { HeroComponent }  from './heroes/hero.component';
import { HeroDetailComponent } from './heroes/hero.detail.component';
import { HeroBackgroundComponent } from './heroes/hero.background.component';
import { HeroPowersComponent } from './heroes/hero.powers.component';
import { HeroQuotesComponent } from './heroes/hero.quotes.component';
import { ComicsComponent } from './comics/comics.component';

const heroRoutes:any =   { 
    path: 'heroes',
    children: [
      { 
        path: '', 
        component: HeroesComponent
      },
      { 
        path: ':id', 
        component: HeroComponent,
        children: [
          { 
            path: '', 
            component: HeroDetailComponent
          },
          {
            path: 'background',
            component: HeroBackgroundComponent
          },
          {
            path: 'powers',
            component: HeroPowersComponent
          },
          {
            path: 'quotes',
            component: HeroQuotesComponent
          }
        ]
      }
    ]
  };

const publisherRoutes:any = {
    path: 'publishers', 
    children: [
      { 
        path: '', 
        component: PublishersComponent
      },
      { 
        path: ':id', 
        component: PublisherComponent,
        children: [
          { 
            path: '', 
            component: PublisherDetailComponent
          },
          {
            path: 'heroes',
            component: PublisherHeroesComponent
          }
        ]
      }
    ]
}

const comicRoutes:any = {
    path: 'comics', 
    children: [
      {
        path: '',
        component: ComicsComponent
      }
    ]
}

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard',
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard',  
    component: DashboardComponent
  },
  publisherRoutes,
  heroRoutes,
  comicRoutes
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}