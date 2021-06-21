import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
	name: 'isActivePipe'
})
export class IsActivePipe implements PipeTransform {
	constructor(private sanitized: DomSanitizer) {}

	transform(value: boolean): SafeHtml {
		let result: string;

		if (value) {
			result = '<span style="color: green;">Sim</span>';
		} else {
			result = '<span style="color: red;">Não</span>';
		}

		return this.sanitized.bypassSecurityTrustHtml(result);
	}
}
