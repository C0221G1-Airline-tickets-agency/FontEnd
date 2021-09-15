import {AbstractControl} from '@angular/forms';

export function comparePassword(control: AbstractControl) {
  const v = control.value;
  if (v.newPassword === v.confirmPassword) {
    return null;
  } else {
    return {passwordNotMatch: true};
  }
}
