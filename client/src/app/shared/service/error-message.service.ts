import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  getMessage(control: AbstractControl | null): string {
    const errorMessages: { [key: string]: string } = {
      required: 'Campo obrigatório, entre com algum valor',
      notNumber: 'Valor inserido não é um numero',
      negativeNumber: 'Valores negativos não são permitidos',
      zero: 'O valor não pode ser zero',
      notMoney: 'Valor inserido não é um valor monetario válido',
      
    };
  
    const error = Object.keys(errorMessages).find((errorName) => control?.hasError(errorName));

    return error ? errorMessages[error] : 'campo invalido';

  }
}
