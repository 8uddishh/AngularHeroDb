import { Injectable } from '@angular/core';
import { AppConfig } from './app.config';
import { FireBaseConfig } from './firebase.config';

@Injectable()
export class ConfigService {
    constructor() {
        
    }
    public get FirebaseConfig():FireBaseConfig {
        return AppConfig.getInstance().FirebaseConfig;
    }

}