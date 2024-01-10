import { FormControl, FormGroup, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidatorsForm {


  static isMoney() {

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      
      if (value < 0)
        return { negativeNumber: true }

      if (value == 0)
        return { zero: true }

      const validMoney = /^[0-9]{0,10}(\,[0-9]{1,2})?$/;

      if (!validMoney.test(value))
        return { notMoney: true }

      return null;

    };
  }


}