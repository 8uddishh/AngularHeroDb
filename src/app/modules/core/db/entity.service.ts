import { Headers, Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { BaseService } from './../base/base.service'

export class EntityService<T> extends BaseService {
	private headers = new Headers({'Content-Type': 'application/json'});
	
	constructor (protected http: Http) {
		super();
		//var db = firebase.database().ref() .child('test').push({test: '123' })
	}

	protected get queryMap(): (entity:T) => string {
		return obj => "";
	}

	protected getSingle (url:string): Promise<T>  {
		return this.http.get(url)
	    			.toPromise()
	    			.then(response => response.json().data as T)
	    			.catch(this.handleError);
	}

	protected getAll (url:string): Promise<T[]>  {
		return this.http.get(url)
	    			.toPromise()
	    			.then(response => response.json().data as T[])
	    			.catch(this.handleError);
	}

	protected stockSingle (url:string, entity: T): Promise<T> {
		return this.http
				    .put(url, JSON.stringify(entity), {headers: this.headers})
				    .toPromise()
				    .then(() => entity)
				    .catch(this.handleError);
	}

	protected spawnSingle (url:string, entity: T): Promise<T> {
		return this.http.post(url, JSON.stringify(entity), {headers: this.headers})
				    .toPromise()
				    .then(res => res.json().data as T)
				    .catch(this.handleError);
	}

	protected trashSingle (url:string, id:string): Promise<void> {
		const deleteurl = `${url}/${id}`;
		return this.http.delete(deleteurl, {headers: this.headers})
				    .toPromise()
				    .then(() => null)
				    .catch(this.handleError);
	}

	protected query (url:string, entity:T): Observable<T[]> {
		var querystring = this.queryMap(entity);
		return this.http.get(`${url}/?${querystring}`)
               .map(response => response.json().data as T[]);

	}
}