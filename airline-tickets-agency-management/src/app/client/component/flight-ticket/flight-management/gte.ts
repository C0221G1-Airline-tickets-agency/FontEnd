import {AbstractControl, ValidationErrors} from "@angular/forms";

export function gte(control: AbstractControl): ValidationErrors|null {
  let v = control.value;
  if(v < '2021-09-04' ){
    return {'gte' : true}
  }
}

export function comparisonTime(control: AbstractControl): ValidationErrors|null{
  const v = control.value;
  return (v.departureTime < v.endTime) ? null : { comparisonTime: true };
}

export function comparisonLocation(control: AbstractControl): ValidationErrors|null{
  const v = control.value;
  return (v.locationTo === v.locationFrom) ? { comparisonLocation: true } : null;
}
