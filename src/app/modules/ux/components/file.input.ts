import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-input',
  templateUrl: './file.input.html'
})
export class FileInputComponent {

    @Input()
    buttonClass:string;

    @Input()
    title:string;

    @Input()
    iconClass:string;

    @Input()
    acceptVerbs:string;

    @Input()
    file:any = null;

    @Output() 
    preSelect = new EventEmitter();

    @Output()
    postSelect = new EventEmitter<any>();

    @Output()
    onError = new EventEmitter();

    toggle:string;
    constructor() {
    }

    /*
        The below funstionality can be implemented by passing the $event from template and using event.target.
        as  
        onChange(event:any):void {
        this.preSelect.emit()
        this.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
        this.postSelect.emit(this.file);

        This is not however a recommended angular 4 practice
        Check https://angular.io/docs/ts/latest/guide/user-input.html under section Passing $event is a dubious practice

        Using an user input template reference is the preferred approach
    }
    */

    displayToggler() {
        this.toggle = 'none';
        setTimeout(function() {
            this.check = 'inline-block';
        });
    }
    
    onChange(file:any):void {
        this.preSelect.emit()
        this.file = file;
        this.postSelect.emit(this.file);
    }
}