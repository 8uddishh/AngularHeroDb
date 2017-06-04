import { Params } from "@angular/router";

export enum BreadCrumbScope {
   home = 1,
   heroes = 2,
   publishers = 4,
   hero = home | heroes,
   publisher = home | publishers,
   heroBackground = hero | 8,
   heroPowers = hero | 16,
   heroQuotes = hero | 32
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
  { scope: BreadCrumbScope.hero, displayName: '', iconClass: 'fa fa-heartbeat', route: ['heroes'] },
  { scope: BreadCrumbScope.publisher, displayName: '', iconClass: 'fa fa-bank', route: ['publishers'] },
  { scope: BreadCrumbScope.heroBackground, displayName: 'Stories', iconClass: 'fa fa-anchor', route: ['heroes'] },
  { scope: BreadCrumbScope.heroPowers, displayName: 'Powers', iconClass: 'fa fa-superpowers', route: ['heroes'] },
  { scope: BreadCrumbScope.heroQuotes, displayName: 'Quotes', iconClass: 'fa fa-comments-o', route: ['heroes'] }
]