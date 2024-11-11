import { Pipe, PipeTransform } from '@angular/core';
import { sortArrayByCreated } from '../services/utils.service';

@Pipe({
  name: 'orderByCreated',
  standalone: true
})
export class OrderByCreatedPipe implements PipeTransform {
  transform(value: Iterable<any>, property: string, direction: 'asc' | 'desc' = 'asc'): Iterable<any> {
    if (!Array.isArray(value) || !property) {
      return value;
    }

    return sortArrayByCreated([...value], direction);
  }
}
