import {AbstractControl, ValidationErrors} from "@angular/forms";

export function gte(control: AbstractControl): ValidationErrors|null {
  let v = control.value;
  let t= new Date(v);
  let date = new Date();

  if(t < date){
    return {'gte' : true}
  }else {
    return null;
  }
}

export function comparisonTime(control: AbstractControl): ValidationErrors|null{
  const v = control.value;
  return (v.departureTime < v.endTime) ? null : { comparisonTime: true };
}

export function comparisonLocation(control: AbstractControl): ValidationErrors|null{
  const v = control.value;
  console.log(v)
  return (v.locationTo.cityName === v.locationFrom.cityName) ? { comparisonLocation: true } : null;
}
