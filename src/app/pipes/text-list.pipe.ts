import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textList'
})
export class TextListPipe implements PipeTransform {
  transform(items: string[]): string {
    return items.join(', ');
  }
}
