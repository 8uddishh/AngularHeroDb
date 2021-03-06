import { NgModule, ModuleWithProviders } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';

import { AuthService } from './auth/auth.service';
import { InMemoryDataService } from './memory/in.memory.data.service';
import { LocalStorageService, SessionStorageService } from './storage/storage.service';
import { TextBeautify } from './pipes/text-beautify';
import { TextShortify } from './pipes/text-shortify';
import { SafeStringify } from './pipes/safe-stringify';
import { imageUrlCleanify } from './pipes/image-url-cleanify';
import { sanitify } from './pipes/sanitify';
import { QuoteBeautify } from './pipes/quote-beautify'
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './navigations/menu.component';
import { BreadcrumbComponent } from './navigations/breadcrumb.component';
import { NavigationService } from './navigations/navigation.service';
import { UndirtifyDirective } from './directives/undirtify';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [ TextBeautify, imageUrlCleanify, QuoteBeautify, TextShortify, sanitify, 
    SafeStringify, UndirtifyDirective, LoginComponent, BreadcrumbComponent, MenuComponent ],
  providers: [],
  exports: [ TextBeautify, imageUrlCleanify, QuoteBeautify, TextShortify, sanitify, 
    SafeStringify, UndirtifyDirective, LoginComponent, BreadcrumbComponent, MenuComponent ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: CoreModule,
        providers: [ AuthService, InMemoryDataService, LocalStorageService, SessionStorageService, NavigationService ]
      }
  }
}