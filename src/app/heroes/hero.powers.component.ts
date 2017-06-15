import { Component } from '@angular/core';
import { BaseComponent } from './../modules/core/base/base.component';
import { AuthService } from './../modules/core/auth/auth.service';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';
import { ToastrService } from './../modules/ux/toastr.service';
import { NavigationService } from './../modules/core/navigations/navigation.service';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';
import { HeroPower } from './hero.power.model';
import { Location } from '@angular/common';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { UndirtyDirection } from './../modules/core/directives/undirtify';

@Component({
  selector: 'my-hero-powers',
  templateUrl: './hero.powers.component.html',
  styleUrls: [
    './hero.common.component.css'
  ],
  providers: [
  ]
})
export class HeroPowersComponent extends BaseComponent {
    heroChange:Subscription;
    hero:Hero;
    newPower: HeroPower = { id: '', name: '' }

    powers:any[] = [];

    constructor(protected authService: AuthService, private heroService: HeroService, private toastrService:ToastrService,
        private navigationService:NavigationService, private location: Location) {
        super(authService);
    }

    validate():boolean {
        return !(this.powers.length > 0 && _.every(this.powers, p => p.name));
    }

    goBack(): void {
        this.location.back();
    }

    unDirtifyPowerName(name:string, power:any) {
        setTimeout(() => {
            power.name = name;
        })
    }

    markForDelete(power:any) {
        if(power.new) {
            this.powers = _.reject(this.powers, p => p.id == power.id);
        }
        else {
            power.markForDelete = true;
        }
    }

    markForEdit(power:any) {
        power.underEdit = true;
    }

    addPower() {
        if(this.newPower.name && this.newPower.name.trim() != '')
        this.powers.push({ id: `${this.powers.length + 1}`, name: this.newPower.name, prevValue:this.newPower.name,
                    markForDelete:false, underEdit:false, new:true });
        this.newPower.name = '';
    }

    undo(power:any) {
        if(!power.markForDelete) {
            power.underEdit = false;
            power.name = power.prevValue;
            power.dirtyDirection = UndirtyDirection.forward;
        }
        power.markForDelete = false;
    }

    save():void {
        this.heroService.savePowers(this.hero.id, this.powers)
            .then(result => {
                _.each(this.powers, p => {
                    p.dirtyDirection= UndirtyDirection.backward;
                });
                this.loadPowers();
            });
    }

    loadPowers():void {
        this.heroService.getPowers(this.hero.id)
            .subscribe(powers => {
                this.powers = _.map(powers, power => {
                    return { id: power.id, name: power.name, prevValue: power.name, markForDelete:false, 
                        underEdit:false, new:false, dirtyDirection: UndirtyDirection.none  }
                });
                this.toastrService.showSuccess('Powers loaded successfully');
            });
    }

    ngOnInit(): void {
      
      this.heroChange = this.heroService.heroChangeAnnounced$.subscribe(hero => {
          
          if(this.location.path().endsWith('powers')) {
              this.hero = hero;
              this.navigationService.navigationAnnounce(BreadCrumbScope.heroPowers, this.hero.id, this.hero.name);
              this.navigationService.menuChangeAnnounce(MenuScope.hero, this.hero.id, this.hero.name);
              this.toastrService.showInfo('Loading powers');
              this.loadPowers();
          }
          
      });

      super.ngOnInit();
    }

    ngOnDestroy() {
        this.heroChange.unsubscribe();
        super.ngOnDestroy();
    }
}
