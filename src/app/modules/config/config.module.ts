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
                      apiKey: "AIzaSyBe9RK6rGH2aPdYpoKsGuAG-cXxveQ87iQ",
                      authDomain: "angular4hero.firebaseapp.com",
                      databaseURL: "https://angular4hero.firebaseio.com",
                      projectId: "angular4hero",
                      storageBucket: "angular4hero.appspot.com",
                      messagingSenderId: "543290559488"
                    } as FireBaseConfig)
      return {
        ngModule: ConfigModule,
        providers: [ ConfigService ]
      }
  }
}