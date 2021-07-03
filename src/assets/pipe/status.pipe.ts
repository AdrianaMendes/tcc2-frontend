import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {
	transform(value: string): string {
		let result: string;
		switch (value) {
			case '0':
				result = 'Aberto';
				break;
			case '1':
				result = 'Processando';
				break;
			case '2':
				result = 'Finalizado';
				break;
			default:
				result = 'Erro interno';
				break;
		}
		return result;
	}
}
