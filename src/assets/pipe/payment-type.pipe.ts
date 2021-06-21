import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'paymentTypePipe'
})
export class PaymentTypePipe implements PipeTransform {
	transform(value: string): string {
		let result: string;
		switch (value) {
			case '0':
				result = 'Não informado';
				break;
			case '1':
				result = 'Dinheiro';
				break;
			case '2':
				result = 'Débito';
				break;
			case '3':
				result = 'Crédito';
				break;
			case '4':
				result = 'Pix';
				break;
			default:
				result = 'Erro interno';
				break;
		}
		return result;
	}
}
