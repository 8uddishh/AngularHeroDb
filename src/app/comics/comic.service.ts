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

    protected get snapShotMapper (): (key:string, value:any) => Comic {
        return (key, value) => {
            let entity = {
                id: key,
                name: value.name,
                publisherId: value.publisherId,
                heroIds: _.map(_.filter(_.keys(value.heroIds), h => value.heroIds[h] == true ), h => h),
                synopsis: value.synopsis,
                thumbnailUrl: value.thumbnailUrl
            } as Comic;
            return entity;
        };
    }

    protected get searchIndex (): (entity:Comic) => string {
        return (entity) => entity.name;
    }

    public changeImage(id: string, file:any): firebase.storage.UploadTask {
        var storageRef = this.firebaseService.FireStorage.ref(`ComicThumbnails/${id}`);
        return storageRef.put(file);
    }

    public spawnComic(comic:Comic):firebase.Promise<string> {
        let keyRef = this.ref.push();
        let key = `Comic${keyRef.key}`;
        let updateObject = {};
        let saveEntity:any = _.omit(comic, ['id', 'searchIndex', 'heroIds']);
        saveEntity.heroIds = {};
        _.each(comic.heroIds, heroid => {
            saveEntity.heroIds[heroid] = true;
        });
        saveEntity['searchKey'] = this.searchIndex(comic).toLowerCase();
        updateObject[`Comics/${key}`] = saveEntity;

        return this.db.ref().update(updateObject).then(response => {
                    return key;
                }).catch( err => this.handleError(err));
    }

    public stockComic(comic:Comic):firebase.Promise<string>  {
        let updateObject = {};
        let saveEntity:any = _.omit(comic, ['id', 'searchIndex', 'heroIds']);
        saveEntity.heroIds = {};
        _.each(comic.heroIds, heroid => {
            saveEntity.heroIds[heroid] = true;
        });
        updateObject[`Comics/${comic.id}`] = saveEntity;
        return this.db.ref().update(updateObject).then(response => {
                    return comic.id;
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

    public deletePublisherMap(comic:Comic):firebase.Promise<Comic>  {
        let updateObject = {};
        updateObject[`PublisherComics/${comic.publisherId}/${comic.id}`] = null;

        return this.db.ref().update(updateObject).then(response => {
                    return comic;
                }).catch( err => this.handleError(err));
    }

    public deleteHeroesMap(comic:Comic):firebase.Promise<Comic>  {
        let updateObject = {};
        _.each(comic.heroIds, h => {
            updateObject[`HeroesComics/${h}/${comic.id}`] = null;
        });
        
        return this.db.ref().update(updateObject).then(response => {
                    return comic;
                }).catch( err => this.handleError(err));
    } 
}