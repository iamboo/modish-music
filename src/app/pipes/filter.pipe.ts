import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string | string[], value: string): any[] {
    const fieldArray = Array.isArray(field) ? field : [field];
    if (!value || value === '') {
      return items;
    }
    if (!items) {
      return [];
    }
    if (fieldArray.length > 0) {
      const itemMatchField = (item: any): any => {
        let found = false;
        fieldArray.forEach(fieldName => {
          let searchValue = item[fieldName];
          if (fieldName.indexOf('.') > 0) {
            const fields = fieldName.split('.');
            searchValue = item[fields[0]][fields[1]];
          }
          const match = searchValue && searchValue.toLowerCase().indexOf(value.toLowerCase()) > -1;
          if (match) {
            found = true;
          }
        });
        return found;
      };
      const filtered = items.filter(it => {
        return itemMatchField(it);
      });
      return filtered;
    }
    return items.filter(it => it && it.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }
}
