import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'view'
})
export class ViewsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) { return }
    var result: string;
    if (+value >= 999) result = (+value / 1000).toFixed(1) + '  k';
    if (+value >= 999999) result = (+value / 1000000).toFixed(1) + '  m';
    if (+value >= 999999999) result = (+value / 1000000000).toFixed(1) + '  bn';
    return result + "  views";
  }
}