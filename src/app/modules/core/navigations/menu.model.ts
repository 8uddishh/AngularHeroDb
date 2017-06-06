
export enum MenuScope {
    parent = 1,
    hero = 2,
    publisher = 4,
    comic = 8
}

export class MenuModel {
    displayName: string;
    iconClass:string;
    route: any[];

    menuScope:MenuScope;
    isBack:boolean;
    level: number;
}

export const MenuItems:MenuModel[] = [
    { displayName:'Back', iconClass:'fa fa-reply fa-3x', route: [], menuScope: MenuScope.hero | MenuScope.publisher, isBack: true, level: 2 },
    { displayName:'Dashboard', iconClass:'fa fa-dashboard fa-3x', route: ['dashboard'], menuScope: MenuScope.parent, isBack: false, level: 1 },
    { displayName:'Publishers', iconClass:'fa fa-bank fa-3x', route: ['publishers'], menuScope: MenuScope.parent, isBack:false, level:1 },
    { displayName:'Heroes', iconClass:'fa fa-heartbeat fa-3x', route: ['heroes'], menuScope: MenuScope.parent, isBack:false, level: 1 },
    { displayName:'Comics', iconClass:'fa fa-book fa-3x', route: ['comics'], menuScope: MenuScope.parent, isBack:false, level:1 },
    { displayName:'Publisher', iconClass:'fa fa-bank fa-3x', route: ['publishers'], menuScope: MenuScope.publisher, isBack:false, level:2 },
    { displayName:'Hero', iconClass:'fa fa-heartbeat fa-3x', route: ['heroes'], menuScope: MenuScope.hero, isBack:false, level: 2 },
    { displayName:'Stories', iconClass:'fa fa-anchor fa-2x', route: ['heroes'], menuScope: MenuScope.hero, isBack:false,level:3 },
    { displayName:'Powers', iconClass:'fa fa-superpowers fa-2x', route: ['heroes'], menuScope: MenuScope.hero, isBack:false,level:3 },
    { displayName:'Quotes', iconClass:'fa fa-comments-o fa-2x', route: ['heroes'], menuScope: MenuScope.hero, isBack:false,level:3 },
    { displayName:'Heroes', iconClass:'fa fa-heartbeat fa-2x', route: ['publishers'], menuScope: MenuScope.publisher, isBack:false, level:3 },
    { displayName:'Comics', iconClass:'fa fa-book fa-2x', route: ['publishers'], menuScope: MenuScope.publisher, isBack:false, level:3 },
];