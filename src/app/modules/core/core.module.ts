import { NgModule, ModuleWithProviders } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { InMemoryDataService } from './memory/in.memory.data.service';
import { LocalStorageService, SessionStorageService } from './storage/storage.service';
import { TextBeautify } from './pipes/text-beautify';
import { imageUrlCleanify } from './pipes/image-url-cleanify';
import { QuoteBeautify } from './pipes/quote-beautify'
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './navigations/menu.component';
import { BreadcrumbComponent } from './navigations/breadcrumb.component';
import { NavigationService } from './navigations/navigation.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [ TextBeautify, imageUrlCleanify, QuoteBeautify, LoginComponent, BreadcrumbComponent, MenuComponent ],
  providers: [],
  exports: [ TextBeautify, imageUrlCleanify, QuoteBeautify, LoginComponent, BreadcrumbComponent, MenuComponent ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: CoreModule,
        providers: [ AuthService, InMemoryDataService, LocalStorageService, SessionStorageService, NavigationService ]
      }
  }
}