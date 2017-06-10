import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import { EntityFireBaseService } from './../modules/core/db/entity.firebase.service';
import { FirebaseService } from './../modules/firebase/firebase.service';
import { Comic } from './comic.model';
import * as _ from 'lodash';

@Injectable()
export class ComicService extends EntityFireBaseService<Comic> {

    constructor(protected firebaseService: FirebaseService) {
        super(firebaseService, "Comics", "Comic");
    }

    protected get searchIndex (): (entity:Comic) => string {
        return (entity) => entity.name;
    }

    public spawnComic(comic:Comic):firebase.Promise<string> {
        let keyRef = this.ref.push();
        let updateObject = {};
        let saveEntity:any = _.omit(comic, ['id', 'searchIndex', 'heroIds']);
        saveEntity.heroIds = {};
        _.each(comic.heroIds, heroid => {
            saveEntity.heroIds[heroid] = true;
        });
        saveEntity['searchKey'] = this.searchIndex(comic).toLowerCase();
        updateObject[`Comics/${keyRef.key}`] = saveEntity;

        return this.db.ref().update(updateObject).then(response => {
                    return keyRef.key;
                }).catch( err => this.handleError(err));
    }

    public mapPublisher(comic:Comic, originalPublisherId?:string):firebase.Promise<Comic>  {
       if(originalPublisherId) 
       {
           let updateObject = {};
           updateObject[`PublisherComics/${originalPublisherId}/${comic.id}`] = null;
           updateObject[`PublisherComics/${comic.publisherId}/${comic.id}`] = true;
           return this.db.ref().update(updateObject).then(response => {
                    return comic;
                }).catch( err => this.handleError(err));
       }
            
       return this.db.ref().child(`PublisherComics/${comic.publisherId}/${comic.id}`)
            .set(true)
            .then(response => {
                return comic;
            }).catch( err => this.handleError(err));
    } 

    public mapHeroes(comic:Comic, oldHeroIds:string[]):firebase.Promise<Comic> {
        let updateObject = {};
        if(oldHeroIds && oldHeroIds.length > 0)
        {
            _.each(oldHeroIds, heroid => {
                updateObject[`HeroComics/${heroid}/${comic.id}`] = null;
            });
        }

        _.each(comic.heroIds, heroid => {
            updateObject[`HeroComics/${heroid}/${comic.id}`] = true;
        });

        return this.db.ref().update(updateObject).then(response => {
            return comic;
        }).catch( err => this.handleError(err));
    }  
}