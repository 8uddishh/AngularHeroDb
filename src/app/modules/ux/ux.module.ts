import { NgModule, ModuleWithProviders } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ToastrService } from './toastr.service';
import { FileInputComponent } from './components/file.input';
import { ColorPickerComponent } from './components/color.picker';
import { MultiSelectComponent } from './components/multi.select';
import { FocusDirective } from './directives/focus.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ FileInputComponent, ColorPickerComponent, MultiSelectComponent, FocusDirective ],
  providers: [],
  exports: [ FileInputComponent, ColorPickerComponent, MultiSelectComponent ]
})
export class UxModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: UxModule,
        providers: [ ToastrService ]
      }
  }
}