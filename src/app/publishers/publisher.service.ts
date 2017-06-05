import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { EntityFireBaseService } from './../modules/core/db/entity.firebase.service';
import { FirebaseService } from './../modules/firebase/firebase.service';
import { Publisher } from './publisher.model';

@Injectable()
export class PublisherService extends EntityFireBaseService<Publisher> {

    private publisherChangeAnnouncedSource = new Subject<Publisher>();
    publisherhangeAnnounced$ = this.publisherChangeAnnouncedSource.asObservable();

    publisherChangeAnnounce(hero:Publisher){
        this.publisherChangeAnnouncedSource.next(hero);
    }

    constructor(protected firebaseService: FirebaseService) {
        super(firebaseService, "Publishers", "Publisher");
    }

    protected get searchIndex (): (entity:Publisher) => string {
        return (entity) => entity.name;
    }
    
    changeImage(id: string, file:any, isLogo:boolean ): firebase.storage.UploadTask {
        var storageRef = this.firebaseService.FireStorage.ref(`${isLogo ? 'Logos': 'CoverPics'}/${id}`);
        return storageRef.put(file);
    }
}