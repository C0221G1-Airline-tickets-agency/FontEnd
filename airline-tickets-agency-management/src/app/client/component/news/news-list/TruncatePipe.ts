import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'limitToPipe'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {

    const trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
