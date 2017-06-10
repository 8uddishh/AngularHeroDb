import { Component, ElementRef, Input, Output, EventEmitter, OnInit, OnChanges,SimpleChanges, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
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
    //@Output() ngModelChange = new EventEmitter<any[]>();

    model: any[] = [];
    showPop: boolean = false;
    onModelChange: Function = (md: any) => {
     };
    onModelTouched: Function = () => { };

    searchText:string;
    selectedIndex:boolean[] = [];

    filteredList$: Observable<any[]>;
    private searchTerms = new Subject<string>();

    selectedList: any[] = [];


    title:string = "Default Value";

    onFocusout(event:any) {
      if (!this._ref.nativeElement.contains(event.target)) 
      this.showPop = false;
    }

    constructor(private _ref:ElementRef) {  
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['options']) {
            this.filteredList$ = Observable.of<any[]>(this.options);
        }  
    }

    ngOnInit () {
        this.searchTerms
            .debounceTime(300)  
            .distinctUntilChanged() 
            .subscribe( term => {
                this.filteredList$ = term ? 
                Observable.of<any[]>(_.filter(this.options, opt => _.includes(opt[this.textField].toLowerCase(), term.toLowerCase()))) 
                : Observable.of<any[]>(this.options)
            });
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    select(option:any, index:number) {
        if(_.every(this.selectedList, selected => selected[this.valueField] != option[this.valueField])) {
            this.selectedList.push(option)
            this.selectedIndex[index] = true;
        }
        else {
            this.selectedList = _.reject(this.selectedList, selected => selected[this.valueField] == option[this.valueField]);
            this.selectedIndex[index] = false;
        }   
        this.model = _.map(this.selectedList, sel => sel[this.valueField]);
        this.onModelChange(this.model);
        this.searchText = '';
        this.searchTerms.next(this.searchText); 
    }

    getText(option:any) {
        return option[this.textField];
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.model = value;
            console.log(value)
            this.selectedIndex = _.map(this.options, option => false);
            this.selectedList = _.filter(this.options, opt => _.some(this.model, m => m == opt[this.valueField]))
        } else {
            this.selectedList = [];
            this.selectedIndex = [];
            this.model = [];
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
}