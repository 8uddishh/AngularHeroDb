import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'safeStringify'})
export class SafeStringify implements PipeTransform {

    public transform(input:string): string {
        return input ? input : '--';
    }
}