import { Component, ElementRef, Input, Output, EventEmitter, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import * as _ from 'lodash';

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelectComponent),
  multi: true
};

@Component({
  selector: 'multi-select',
  templateUrl: './multi.select.html',
  styleUrls: [
      './multi.select.css'
  ],
  providers: [MULTISELECT_VALUE_ACCESSOR],
  host: {
    '(document:click)': 'onFocusout($event)',
  }
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {

    @Input() options: any[];
    @Input() textField:string;
    @Input() valueField:string;
    @Output() ngModelChange = new EventEmitter<any[]>();

    model: any[];
    showPop: boolean = false;
    onModelChange: Function = (md: any) => { };
    onModelTouched: Function = () => { };

    searchText:string;
    selectedIndex:boolean[] = [];


    selectedList: any[] = [];


    title:string = "Default Value";

    onFocusout(event:any) {
      if (!this._ref.nativeElement.contains(event.target)) 
      this.showPop = false;
    }

    constructor(private _ref:ElementRef) {  
    }

    ngOnInit () {

    }

    select(option:any, index:number) {
        if(_.every(this.selectedList, selected => selected[this.valueField] != option[this.valueField]))
        {
            this.selectedList.push(option)
            this.selectedIndex[index] = true;
        }
        else {
            this.selectedList = _.reject(this.selectedList, selected => selected[this.valueField] == option[this.valueField]);
            this.selectedIndex[index] = false;
        }    
    }

    getText(option:any) {
        return option[this.textField];
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.model = value;
            this.selectedIndex = _.map(this.model, model => false);
        } else {
            this.model = [];
            this.selectedIndex = [];
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}