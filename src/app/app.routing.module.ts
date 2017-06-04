import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { PublisherComponent } from './publishers/publisher.component';
import { PublishersComponent } from './publishers/publishers.component';
import { HeroesComponent }  from './heroes/heroes.component';
import { HeroComponent }  from './heroes/hero.component';
import { HeroDetailComponent } from './heroes/hero.detail.component';
import { HeroBackgroundComponent } from './heroes/hero.background.component';
import { HeroPowersComponent } from './heroes/hero.powers.component';
import { HeroQuotesComponent } from './heroes/hero.quotes.component';

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

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard', //1
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard',  
    component: DashboardComponent //1
  },
  { 
    path: 'publishers', 
    children: [
      { 
        path: '', 
        component: PublishersComponent //2
      },
      { 
        path: ':id', 
        component: PublisherComponent // 3
      }
    ]
  },
  heroRoutes
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}