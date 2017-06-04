import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'quoteBeautify'})
export class QuoteBeautify implements PipeTransform {

    public transform(input:string): string {
        if (!input) {
            return '';
        } else {
            return `"${input}"`;
        }
    }
}