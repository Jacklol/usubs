import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'view'
})
export class ViewPipe implements PipeTransform {
  transform(value: string): string {
  	if (!value){return}
	var num=+value;
 	var length=value.length;
	var result=value;
    if(num>=999) result= (num/1000).toFixed(1)+'  k';
    if(num>=999999) result=(num/1000000).toFixed(1)+'  m';
    if(num>=999999999) result=(num/1000000000).toFixed(1)+'  bn';
    return result+"  views";
  }
}