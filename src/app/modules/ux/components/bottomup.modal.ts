import { Component, ElementRef, Input, Output, EventEmitter, OnInit, OnChanges,SimpleChanges, forwardRef } from '@angular/core';

@Component({
  selector: 'bottomup-modal',
  templateUrl: './bottomup.modal.html',
  styleUrls: [
      './bottomup.modal.css'
  ],
  providers: [],
  host: {
    '(document:click)': 'onFocusout($event)',
  }
})
export class BottomupModalComponent implements OnInit, OnChanges {

    @Input() 
    show:boolean;

    showModal:boolean;

    onFocusout(event:any) {
        this.show = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['show']) 
            this.showModal = this.show;
    }

    ngOnInit ():void {
    }
}