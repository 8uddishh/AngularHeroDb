import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[focus]', 
})
  export class FocusDirective {
    constructor() { }
    @HostListener('focusout', ['$event.target'])
    onFocusout(target:any) {
      console.log("Focus out called");
    }
  }