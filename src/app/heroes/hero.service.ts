import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import * as Rx from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import { Observable }     from 'rxjs/Observable';

import { EntityFireBaseService } from './../modules/core/db/entity.firebase.service';
import { FirebaseService } from './../modules/firebase/firebase.service';
import { Hero } from './hero.model';
import { HeroPower } from './hero.power.model';
import { HeroQuote } from './hero.quote.model';
import { HeroStory } from './hero.story.model';

@Injectable()
export class HeroService extends EntityFireBaseService<Hero> {

    private heroChangeAnnouncedSource = new Subject<Hero>();
    heroChangeAnnounced$ = this.heroChangeAnnouncedSource.asObservable();

    heroChangeAnnounce(hero:Hero){
        this.heroChangeAnnouncedSource.next(hero);
    }

    constructor(protected firebaseService: FirebaseService) {
        super(firebaseService, "Heroes", "Hero");
    }

    protected get searchIndex (): (entity:Hero) => string {
        return (entity) => entity.name;
    }
    
    public changeImage(id: string, file:any, isLogo:boolean ): firebase.storage.UploadTask {
        var storageRef = this.firebaseService.FireStorage.ref(`${isLogo ? 'Logos': 'CoverPics'}/${id}`);
        return storageRef.put(file);
    }

    public mapPublisher(hero:Hero, originalPublisherId?:string):firebase.Promise<Hero>  {
       if(originalPublisherId) 
       {
           let updateObject = {};
           updateObject[`PublisherHeroes/${originalPublisherId}/${hero.id}`] = null;
           updateObject[`PublisherHeroes/${hero.publisherId}/${hero.id}`] = true;
           return this.db.ref().update(updateObject).then(response => {
                    return hero;
                }).catch( err => this.handleError(err));
       }
            
       return this.db.ref().child(`PublisherHeroes/${hero.publisherId}/${hero.id}`)
            .set(true)
            .then(response => {
                return hero;
            }).catch( err => this.handleError(err));
    }     

    public deletePublisherMap(hero:Hero):firebase.Promise<Hero>  {
        let updateObject = {};
        updateObject[`PublisherHeroes/${hero.publisherId}/${hero.id}`] = null;

        return this.db.ref().update(updateObject).then(response => {
                    return hero;
                }).catch( err => this.handleError(err));
    }

    public getPowers(id:string):Observable<HeroPower[]>  {
        return Observable.fromPromise(this.db.ref().child(`SuperPowers/${id}`).once('value') as Promise<any>)
                    .map(observable => {
                        var x = _.transform(observable.val(), (result:any, value:any, key:string) => {
                            result.push({ id:key, name:value });
                        }, []);
                        return x as HeroPower[];
                    });
        
    }

    public savePowers(id:string, powers:any) {
        let updateObject = {};
        _.each(powers, power => {
            if(power.underEdit)
                updateObject[`SuperPowers/${id}/${power.id}`] = power.name;
            if(power.markForDelete)
                updateObject[`SuperPowers/${id}/${power.id}`] = null;
            if(power.new) {
                let key = `Power${this.getKey()}`;
                updateObject[`SuperPowers/${id}/${key}`] = power.name;
            }
        });
        return this.db.ref().update(updateObject).then(response => {
                    return true;
        }).catch( err => this.handleError(err));
    }

    public getQuotes(id:string):Observable<HeroQuote[]>  {
        return Observable.fromPromise(this.db.ref().child(`Quotes/${id}`).once('value') as Promise<any>)
                    .map(observable => {
                        var x = _.transform(observable.val(), (result:any, value:any, key:string) => {
                            result.push({ id:key, name:value.name, emotion: value.emotion });
                        }, []);
                        return x as HeroQuote[];
                    });
        
    }

    public spawnQuote (id:string, entity: HeroQuote): firebase.Promise<HeroQuote> {
        let keyRef = this.db.ref().child(`Quotes/${id}`).push();
        let key = `Quote${keyRef.key}`;
        let entityRef = this.db.ref().child(`Quotes/${id}`).child(key);

        var saveEntity = _.omit(entity, ['id']);
        return entityRef.set(saveEntity).then( response => {
            let result = _.clone(entity);
            result.id = key;
            return result;
        }).catch( err => this.handleError(err));
    }

    public stockQuote (id:string, entity:HeroQuote): firebase.Promise<boolean> {
        var saveEntity = _.omit(entity, ['id']);
        return this.db.ref().child(`Quotes/${id}/${entity.id}`).update(saveEntity)
            .catch( err => this.handleError(err))
            .then( response => true );
    }

    public trashQuote (heroId:string, id:string): firebase.Promise<boolean> {
        return this.db.ref().child(`Quotes/${heroId}/${id}`).remove()
            .catch( err => this.handleError(err))
            .then( response => true );
    }

    public getStories(id:string):Observable<HeroStory[]>  {
        return Observable.fromPromise(this.db.ref().child(`Stories/${id}`).once('value') as Promise<any>)
                    .map(observable => {
                        var x = _.transform(observable.val(), (result:any, value:any, key:string) => {
                            result.push({ id: key, title: value.title, story: value.story, templateType:value.templateType, 
                                imageUrl: value.imageUrl, coordinates: value.coordinates });
                        }, []);
                        return x as HeroStory[];
                    });
        
    }

    public spawnStory (id:string, entity: HeroStory): firebase.Promise<HeroStory> {
        let keyRef = this.db.ref().child(`Stories/${id}`).push();
        let key = `Story${keyRef.key}`;
        let entityRef = this.db.ref().child(`Stories/${id}`).child(key);

        var saveEntity = _.omit(entity, ['id']);
        return entityRef.set(saveEntity).then( response => {
            let result = _.clone(entity);
            result.id = key;
            return result;
        }).catch( err => this.handleError(err));
    }

    public stockStory (id:string, entity:HeroStory): firebase.Promise<boolean> {
        var saveEntity = _.omit(entity, ['id']);
        return this.db.ref().child(`Stories/${id}/${entity.id}`).update(saveEntity)
            .catch( err => this.handleError(err))
            .then( response => true );
    }

    public changeStoryImage(heroid: string, id:string, file:any): firebase.storage.UploadTask {
        var storageRef = this.firebaseService.FireStorage.ref(`StoryPics/${heroid}-${id}`);
        return storageRef.put(file);
    }

    public trashStory (heroId:string, id:string): firebase.Promise<boolean> {
        return this.db.ref().child(`Stories/${heroId}/${id}`).remove()
            .catch( err => this.handleError(err))
            .then( response => true );
    }
}
