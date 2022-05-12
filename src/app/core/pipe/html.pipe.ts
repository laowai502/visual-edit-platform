import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'Realhtml'
})
export class HtmlPipe implements PipeTransform {

	constructor(private sanitizer: DomSanitizer) {}

	transform(html) {
		return this.sanitizer.bypassSecurityTrustHtml(html);
	}

}
