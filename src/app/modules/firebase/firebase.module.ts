import { NgModule, ModuleWithProviders } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { FirebaseApp } from './firebase.app';
import { FirebaseService } from './firebase.service';
import { ConfigService } from './../config/config.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [],
  exports: []
})
export class FirebaseModule {
    static forRoot(): ModuleWithProviders {
      let fireConfig = new ConfigService().FirebaseConfig;  
      FirebaseApp.getInstance().initialize(fireConfig);
      return {
        ngModule: FirebaseModule,
        providers: [ FirebaseService ]
      }
  }
}