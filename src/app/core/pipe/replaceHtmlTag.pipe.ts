import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'RemoveHtmlTag'
})
export class RemoveHtmlPile implements PipeTransform {

	constructor() {}

	transform(html) {
		return html.replace(/<[^>]+>/g, '').trim();
	}

}
