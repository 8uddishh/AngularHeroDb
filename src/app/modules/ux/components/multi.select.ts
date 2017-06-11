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

export class SelectItem {
    constructor(public option:any, public selected:boolean) {

    }
}

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

    optionItems:SelectItem[];

    model: string[] = [];
    showPop: boolean = false;
    onModelChange: Function = (md: any) => {
     };
    onModelTouched: Function = () => { };

    searchText:string;
    selectedIndex:boolean[] = [];

    filteredList$: Observable<SelectItem[]>;
    private searchTerms = new Subject<string>();

    selectedList: SelectItem[] = [];


    title:string = "Default Value";

    onFocusout(event:any) {
      if (!this._ref.nativeElement.contains(event.target)) 
      this.showPop = false;
    }

    constructor(private _ref:ElementRef) {  
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['options']) {
            this.optionItems = _.map(this.options, opt => new SelectItem(opt, false))
            _.each(this.optionItems, opt => {
                if(_.some(this.model, m => m == opt.option[this.valueField]))
                    opt.selected = true;
            });
            this.filteredList$ = Observable.of<SelectItem[]>(this.optionItems);
            this.selectedList = _.filter(this.optionItems, opt => opt.selected);
        }  
    }

    ngOnInit ():void {
        this.searchTerms
            .debounceTime(300)  
            .distinctUntilChanged() 
            .subscribe( term => {
                this.filteredList$ = term ? 
                Observable.of<SelectItem[]>(_.filter(this.optionItems, opt => _.includes(opt.option[this.textField].toLowerCase(), term.toLowerCase()))) 
                : Observable.of<SelectItem[]>(this.optionItems)
            });
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    remove(opt:SelectItem) {
        opt.selected = false;
        this.selectedList = _.reject(this.selectedList, selected => selected.option[this.valueField] == opt.option[this.valueField]);
        this.model = _.map(this.selectedList, sel => sel.option[this.valueField]);
        this.onModelChange(this.model);
        this.searchText = '';
        this.searchTerms.next(this.searchText); 
    }

    select(opt:SelectItem) {
        if(_.every(this.selectedList, selected => selected.option[this.valueField] != opt.option[this.valueField])) {
            opt.selected = true;
            this.selectedList.push(opt);
        }
        else {
            opt.selected = false;
            this.selectedList = _.reject(this.selectedList, selected => selected.option[this.valueField] == opt.option[this.valueField]);
        }   
        this.model = _.map(this.selectedList, sel => sel.option[this.valueField]);
        this.onModelChange(this.model);
        this.searchText = '';
        this.searchTerms.next(this.searchText); 
    }

    getText(opt:any) {
        return opt.option[this.textField];
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.model = value;
            this.selectedList = _.filter(this.optionItems, opt => _.some(this.model, m => m == opt.option[this.valueField]));
        } else {
            this.selectedList = [];
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