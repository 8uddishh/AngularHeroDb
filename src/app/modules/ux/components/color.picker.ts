import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Color, ColorShade } from './color';
import * as _ from 'lodash';

@Component({
  selector: 'color-picker',
  templateUrl: './color.picker.html',
  styleUrls: [
      './color.picker.css'
  ]
})
export class ColorPickerComponent {
    @Input()
    id:string;

    @Input()
    selectText:string;

    @Input()
    labelText:string;

    @Input()
    selectedColorCode:string;

    @Input()
    disabled:boolean;

    selectedColor:Color;


    @Output()
    onSelect = new EventEmitter<Color>();

    colors:Color[];
    primaryColors:Color[];
    currentPage:number = 1;
    lastPage:number;
    showColorPicker:boolean;


    constructor() {
        
    }

    gotoPrev():void {
        this.currentPage--;
        this.filterColors();
    }

    gotoNext():void {
        this.currentPage++;
        this.filterColors();
    }

    selectColor(color:Color): void {
        this.selectedColor = color;
        this.showColorPicker = false;

        this.onSelect.emit(color);
    }

    filterColors():void {
        let lastGroupInPage:number = this.currentPage * 6;
        this.colors = _.filter(Color.GetAllColors(), color => color.groupNumber > (lastGroupInPage-6) && color.groupNumber <= lastGroupInPage );
    }

    ngOnInit(): void {
        let allColors = Color.GetAllColors();
        let allColorCount = allColors.length;
        this.lastPage = Math.trunc( allColorCount / 60);
        this.primaryColors = Color.GetPrimaryColors();

        if(this.selectedColorCode) {
            //find the selected color 
            let selectedIndex = _.findIndex(allColors, color => color.colorCode == this.selectedColorCode );

            if(selectedIndex == -1)
            {
                selectedIndex = _.findIndex(this.primaryColors, color => color.colorCode == this.selectedColorCode );
                this.selectedColor = this.primaryColors[selectedIndex];
            }
            else {
                this.selectedColor = allColors[selectedIndex];
                this.currentPage = Math.trunc( selectedIndex / 60) + 1;
            }
        }
        this.filterColors();
    }
}