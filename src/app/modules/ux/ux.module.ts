import { NgModule, ModuleWithProviders } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { ToastrService } from './toastr.service';
import { FileInputComponent } from './components/file.input';
import { ColorPickerComponent } from './components/color.picker';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ FileInputComponent, ColorPickerComponent ],
  providers: [],
  exports: [ FileInputComponent, ColorPickerComponent ]
})
export class UxModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: UxModule,
        providers: [ ToastrService ]
      }
  }
}