import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'phone'})
export class CustomPipe implements PipeTransform {
  transform(rawNum) {
    let newStr = '';
    newStr += rawNum.substr(0, 4) + ' ';
    newStr += rawNum.substr(3, 3) + ' ';
    newStr += rawNum.substr(6, 3) + ' ';
    newStr += rawNum.substr(9);
    return newStr ;
  }
}
