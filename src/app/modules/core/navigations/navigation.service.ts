import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import * as _ from 'lodash';
 
import { BreadCrumbScope, BreadCrumbModel, BreadCrumbItems } from './breadcrumb.model';
import { MenuModel, MenuScope, MenuItems } from './menu.model';

@Injectable()
export class NavigationService {

    private navigationAnnouncedSource = new Subject<BreadCrumbModel[]>();
    private menuChangeAnnouncedSource = new Subject<MenuModel[]>();

    navigationAnnounced$ = this.navigationAnnouncedSource.asObservable();
    menuChangeAnnounced$ = this.menuChangeAnnouncedSource.asObservable();

    navigationAnnounce(scope:BreadCrumbScope, ...params:any[]) {
        
        let availables = _.filter([BreadCrumbScope.home, BreadCrumbScope.heroes, BreadCrumbScope.publishers, 
            BreadCrumbScope.hero, BreadCrumbScope.publisher, BreadCrumbScope.heroBackground, 
            BreadCrumbScope.heroQuotes, BreadCrumbScope.heroPowers ], s => s == BreadCrumbScope.home || ((s | scope) == scope && scope >= s));
        let breadcrumbs = _.map(availables, s => {
                return _.cloneDeep(_.find(BreadCrumbItems, b => b.scope == s))
            });
        _.each(breadcrumbs, avail => {

            if((avail.scope | BreadCrumbScope.hero) == avail.scope) {
                avail.route.push(params[0]);
                if(avail.scope == BreadCrumbScope.hero)
                    avail.displayName = params[1];
            }

            if(avail.scope == BreadCrumbScope.heroBackground)
            {
                avail.route.push('background');
            }

            if(avail.scope == BreadCrumbScope.heroPowers)
            {
                avail.route.push('powers');
            }

            if(avail.scope == BreadCrumbScope.heroQuotes)
            {
                avail.route.push('quotes');
            }

            if((avail.scope | BreadCrumbScope.publisher) == avail.scope) {
                avail.route.push(params[0]);
                avail.displayName = params[1];
            }
        });

        this.navigationAnnouncedSource.next(breadcrumbs);
    }

    menuChangeAnnounce(scope:MenuScope, ...routes:any[]) {
        let menuItems = _.map(_.filter(MenuItems, item => (item.menuScope | scope) == item.menuScope), item => {
            return _.cloneDeep(item);
        });

        if(scope == MenuScope.hero) {
            menuItems[0].route.push('/heroes');
            menuItems[1].route.push(routes[0]);
            menuItems[1].displayName = routes[1];
            menuItems[2].route.push(routes[0]);
            menuItems[2].route.push('background');
            menuItems[3].route.push(routes[0]);
            menuItems[3].route.push('powers');
            menuItems[4].route.push(routes[0]);
            menuItems[4].route.push('quotes');
        }

        if(scope == MenuScope.publisher) {
            menuItems[0].route.push('/publishers');
            menuItems[1].route.push(routes[0]);
            menuItems[1].displayName = routes[1];
        }
        this.menuChangeAnnouncedSource.next(menuItems);
    }
}