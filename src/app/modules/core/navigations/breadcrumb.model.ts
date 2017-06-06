import { Params } from "@angular/router";

export enum BreadCrumbScope {
   home = 1,
   heroes = 2,
   publishers = 4,
   comics = 8,
   hero = home | heroes,
   publisher = home | publishers,
   comic = home | comics,
   heroBackground = hero | 16,
   heroPowers = hero | 32,
   heroQuotes = hero | 64,
   publisherHeroes = publisher | 16,
   publisherComics = publisher | 32
}

export class BreadCrumbModel {
  scope:BreadCrumbScope;
  displayName: string;
  iconClass: string;
  route: any[];
}

export interface IBreadcrumb {
  displayName: string;
  iconClass:string;
  route: any[];
}

export const BreadCrumbItems:BreadCrumbModel[] = [
  { scope: BreadCrumbScope.home, displayName: 'Home', iconClass: 'fa fa-home', route: ['dashboard'] },
  { scope: BreadCrumbScope.heroes, displayName: 'Heroes', iconClass: 'fa fa-heartbeat', route: ['heroes'] },
  { scope: BreadCrumbScope.publishers, displayName: 'Publishers', iconClass: 'fa fa-bank', route: ['publishers'] },
  { scope: BreadCrumbScope.comics, displayName: 'Comics', iconClass: 'fa fa-book', route: ['comics'] },
  { scope: BreadCrumbScope.hero, displayName: '', iconClass: 'fa fa-heartbeat', route: ['heroes'] },
  { scope: BreadCrumbScope.publisher, displayName: '', iconClass: 'fa fa-bank', route: ['publishers'] },
  { scope: BreadCrumbScope.heroBackground, displayName: 'Stories', iconClass: 'fa fa-anchor', route: ['heroes'] },
  { scope: BreadCrumbScope.heroPowers, displayName: 'Powers', iconClass: 'fa fa-superpowers', route: ['heroes'] },
  { scope: BreadCrumbScope.heroQuotes, displayName: 'Quotes', iconClass: 'fa fa-comments-o', route: ['heroes'] },
  { scope: BreadCrumbScope.publisherHeroes, displayName: 'Heroes', iconClass: 'fa fa-heartbeat', route: ['publishers'] },
  { scope: BreadCrumbScope.publisherComics, displayName: 'Comics', iconClass: 'fa fa-book', route: ['publishers'] }
]