import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'sanitify'})
export class sanitify implements PipeTransform {
    
    constructor(protected _sanitizer: DomSanitizer) {

	}

    public transform(input:string, type:string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
			case 'html':
				return this._sanitizer.bypassSecurityTrustHtml(input);
			case 'style':
				return this._sanitizer.bypassSecurityTrustStyle(input);
			case 'script':
				return this._sanitizer.bypassSecurityTrustScript(input);
			case 'url':
				return this._sanitizer.bypassSecurityTrustUrl(input);
			case 'resourceUrl':
				return this._sanitizer.bypassSecurityTrustResourceUrl(input);
			default:
				throw new Error(`Unable to bypass security for invalid type: ${type}`);
		}
    }
}