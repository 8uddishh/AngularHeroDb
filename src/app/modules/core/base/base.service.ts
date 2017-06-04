// We will move to observables very soon, depending on the firebase 

export class BaseService {
  
  constructor () {

  }

  protected handleError(err: any): Promise<any> {
    console.error('An error occurred', err); // for demo purposes only
    return Promise.reject(err.message || err);
  }
}

