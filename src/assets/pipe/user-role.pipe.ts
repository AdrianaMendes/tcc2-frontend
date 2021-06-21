import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'userRolePipe'
})
export class UserRolePipe implements PipeTransform {
	transform(value: string): string {
		let result: string;
		switch (value) {
			case '0':
				result = 'Administrador';
				break;
			case '1':
				result = 'Cliente';
				break;
			default:
				result = 'Erro interno';
				break;
		}
		return result;
	}
}
