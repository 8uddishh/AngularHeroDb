import { Component, ElementRef, Input, Output, EventEmitter, OnInit, OnChanges,SimpleChanges, forwardRef } from '@angular/core';

@Component({
  selector: 'popup-modal',
  templateUrl: './popup.modal.html',
  styleUrls: [
      './popup.modal.css'
  ],
  providers: [],
  host: {
    '(document:click)': 'onFocusout($event)',
  }
})
export class PopupModalComponent implements OnInit {

    onFocusout(event:any) {

    }

    ngOnInit ():void {
    }
}