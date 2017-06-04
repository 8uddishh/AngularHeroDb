import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Publisher } from './publisher.model';
import { ToastrService } from './../modules/ux/toastr.service';
import { AuthService } from './../modules/core/auth/auth.service';
import { PublisherService } from './publisher.service';
import { BaseComponent } from './../modules/core/base/base.component';

import { NavigationService } from './../modules/core/navigations/navigation.service';
import { MenuScope } from './../modules/core/navigations/menu.model';
import { BreadCrumbScope } from './../modules/core/navigations/breadcrumb.model';

@Component({
  selector: 'my-publishers',
  providers: [
    PublisherService
  ],
  templateUrl: './publishers.component.html'
})
export class PublishersComponent extends BaseComponent {
    public newPublisher: Publisher = { name: '' } as Publisher;
    public canSave: boolean = false;

    public publishers: Publisher[];

    constructor(protected authService: AuthService, private publisherService:PublisherService, 
        private navigationService:NavigationService, private toastrService:ToastrService, private router:Router) {
        super(authService);
    }

    add(): void {
        this.toastrService.showInfo('Creating new publisher...');
        this.publisherService.spawnSingle(this.newPublisher)
            .then(publisher => {
                console.log(publisher);
                this.publishers.push(publisher);
                this.clear();
                this.toastrService.showSuccess('Publishers created successfully');
            });
    }

    clear(): void {
        this.newPublisher.name = '';
        this.newPublisher.companyInfo = '';
        this.canSave = false;
    }

    delete(publisher:Publisher): void {
        this.toastrService.showInfo('Removing publisher');
        this.publisherService.trashSingle(publisher)
            .then( response => {
                this.publishers = this.publishers.filter( p => p.id != publisher.id);
                this.toastrService.showSuccess('Publisher removed successfully');
            });
    }

    view(publisher:Publisher): void {
        this.router.navigate(['/publishers', publisher.id]);
    }

    ngOnInit(): void {
        super.ngOnInit();
        
        this.toastrService.showInfo('Loading publishers...');

        this.navigationService.navigationAnnounce(BreadCrumbScope.publishers); 
        this.navigationService.menuChangeAnnounce(MenuScope.parent);

        this.publisherService.getPage()
            .subscribe( publishers => {
                this.publishers = publishers;
                this.toastrService.showSuccess('Publishers loaded successfully');
            });
    }
}