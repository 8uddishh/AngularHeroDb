import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'imageUrlCleanify'})
export class imageUrlCleanify implements PipeTransform {

    public transform(input:string): string {
        return input ? input : './images/image-not-found-sm.png';
    }
}