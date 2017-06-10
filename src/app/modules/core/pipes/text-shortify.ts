import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'textShortify'})
export class TextShortify implements PipeTransform {

    public transform(input:string): string {
        if (!input) {
            return '';
        } else {
            return input.length > 30 ? `${input.substring(0, 27)}...` : input ;
        }
    }
}