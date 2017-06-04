import { FireBaseConfig } from './firebase.config';

export class AppConfig {
    private _fconfig:FireBaseConfig;
    private static _instance:AppConfig = new AppConfig();

    constructor() {
        if(AppConfig._instance) {
            console.error('Use AppConfig.getInstance');
        }
        else {
            AppConfig._instance = this;
        }
    }

    public static getInstance():AppConfig
    {
        return AppConfig._instance;
    }

    public get FirebaseConfig():FireBaseConfig {
        return this._fconfig;
    }

    public initialize(firebaseconfig: FireBaseConfig): void {
        this._fconfig = firebaseconfig;
    }
}