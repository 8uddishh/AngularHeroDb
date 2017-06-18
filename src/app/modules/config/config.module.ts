import { NgModule, ModuleWithProviders } from '@angular/core';  
import { CommonModule } from '@angular/common'; 

import { AppConfig } from './app.config';
import { FireBaseConfig } from './firebase.config';
import { ConfigService } from './config.service';


@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [],
  exports: []
})
export class ConfigModule {
    static forRoot(): ModuleWithProviders {
      AppConfig.getInstance().initialize({
                      apiKey: "",
                      authDomain: "",
                      databaseURL: "",
                      projectId: "",
                      storageBucket: "",
                      messagingSenderId: ""
                    } as FireBaseConfig)
      return {
        ngModule: ConfigModule,
        providers: [ ConfigService ]
      }
  }
}