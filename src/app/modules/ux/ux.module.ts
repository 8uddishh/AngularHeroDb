import { NgModule, ModuleWithProviders } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ToastrService } from './toastr.service';
import { FileInputComponent } from './components/file.input';
import { ColorPickerComponent } from './components/color.picker';
import { MultiSelectComponent } from './components/multi.select';
import { FocusDirective } from './directives/focus.directive';
import { PopupModalComponent } from './components/popup.modal';
import { PopupModalContentComponent } from './components/popup.modal.content';
import { PopupModalFooterComponent } from './components/popup.modal.footer';
import { BottomupModalComponent } from './components/bottomup.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ FileInputComponent, ColorPickerComponent, MultiSelectComponent, 
    PopupModalComponent, PopupModalContentComponent, PopupModalFooterComponent, 
    BottomupModalComponent, FocusDirective ],
  providers: [],
  exports: [ FileInputComponent, ColorPickerComponent, MultiSelectComponent,
    PopupModalComponent, PopupModalContentComponent, PopupModalFooterComponent, BottomupModalComponent ]
})
export class UxModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: UxModule,
        providers: [ ToastrService ]
      }
  }
}