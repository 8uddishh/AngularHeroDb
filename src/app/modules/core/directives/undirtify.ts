import { Directive, ElementRef, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

export enum UndirtyDirection {
    none = 0,
    forward,
    backward
}

@Directive({ selector: '[undirtify]' })
export class UndirtifyDirective implements OnInit, OnChanges {
    @Input() 
    currValue: any;

    @Input()
    undirtify:UndirtyDirection;

    prevValue:any;

    @Output()
    onRevert = new EventEmitter<any>();

    constructor(el: ElementRef) { }

    ngOnInit () {
        this.prevValue = this.currValue;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['undirtify']) {
            console.log(this.undirtify)
            if(this.undirtify == UndirtyDirection.forward) {
                this.currValue = this.prevValue;
                this.onRevert.emit(this.prevValue);
            }
            if(this.undirtify == UndirtyDirection.backward)    
                this.prevValue = this.currValue;
        }
    }
}