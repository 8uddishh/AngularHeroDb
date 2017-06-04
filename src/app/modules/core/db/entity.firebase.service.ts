import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Observer }     from 'rxjs/Observer';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import { FirebaseService } from './../../firebase/firebase.service';
import { BaseService } from './../base/base.service';

import { IModel } from './entity.model';

export class EntityFireBaseService<T extends IModel> extends BaseService {

    protected auth: firebase.auth.Auth;
    protected db: firebase.database.Database;
    protected ref: firebase.database.Reference;

    protected get searchIndex (): (entity:T) => string {
        return (entity) => '';
    }

    protected get snapShotMapper (): (key:string, value:any) => T {
        return (key, value) => {
            let entity = value as T;
            entity.id = key;
            return entity;
        };
    }

    constructor(protected firebaseService: FirebaseService, private collectionRefName: string, private entityRefPrefix: string) {
        super();
        this.auth = this.firebaseService.FireAuth;
        this.db = this.firebaseService.FireDb;
        this.ref = this.db.ref().child(this.collectionRefName);
    }

    public getSingle(key:string):Observable<T>  {
        return Observable.fromPromise(this.ref.child(key).once('value') as Promise<any>)
                    .map(observable => this.snapShotMapper(key, observable.val()));
    }

    public getPage ():Observable<T[]> {
        return Observable.fromPromise(this.ref.once('value') as Promise<any>)
                    .map(observable => {
                        var x = _.transform(observable.val(), (result:any, value:any, key:string) => {
                            result.push(this.snapShotMapper(key, value));
                        }, []);
                        return x as T[];
                    });
    }

    public getKey():string {
        return this.ref.push().key;
    }

    public spawnSingle (entity: T): firebase.Promise<T> {
		let keyRef = this.ref.push();
        let key = `${this.entityRefPrefix}${keyRef.key}`;
        let entityRef = this.ref.child(key);

        var saveEntity = _.assign({ searchKey: this.searchIndex(entity).toLowerCase() },_.omit(entity, ['id', 'searchIndex']));
        return entityRef.set(saveEntity).then( response => {
            let result = _.clone(entity);
            result.id = key;
            return result;
        }).catch( err => this.handleError(err));
	}

    public stockSingle (entity:T): firebase.Promise<boolean> {
        var saveEntity = _.assign({ searchKey: this.searchIndex(entity).toLowerCase() },_.omit(entity, ['id', 'searchIndex']));
        return this.ref.child(entity.id).update(saveEntity)
            .catch( err => this.handleError(err))
            .then( response => true );
    }

    public trashSingle (entity:T): firebase.Promise<boolean> {
        return this.ref.child(entity.id).remove()
            .catch( err => this.handleError(err))
            .then( response => true );
    }
    
    //Firebase is case sensitive so far there is no support for case insensitive search -- save the lowercase too no other go
    startsWith(search:string):Observable<T> {
        // You can use once like in getPage... this is a POC to check Observable from Event
        let searchName = search.toLowerCase();
        let searchUtfName = _.reduce(searchName, (str, char) => `${str}${char}\\uf8ff`, '');
        // console.log(searchUtfName); .endAt(`${searchUtfName}`)
        return new Observable<T>((observer:Observer<T>) => {
            this.ref.orderByChild('searchKey')
                            .startAt(searchName).endAt(`${searchName}\\uf8ff`).on('child_added', snap => {
                                console.log('child added');
                                observer.next(this.snapShotMapper(snap.key, snap.val()));
                            });
        });
    } 

    public Limit (count:number):Observable<T[]> {
        return Observable.fromPromise(this.ref.orderByKey().limitToFirst(count).once('value') as Promise<any>)
                    .map(observable => {
                        var x = _.transform(observable.val(), (result:any, value:any, key:string) => {
                            result.push(this.snapShotMapper(key, value));
                        }, []);
                        return x as T[];
                    });
    }  
}