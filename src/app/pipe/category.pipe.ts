
import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {


  transform(value: Category[], filtertext: string): Category[] {
    filtertext=filtertext?filtertext.toLocaleLowerCase():""
    return filtertext?value.filter((p:Category)=>p.categoryName.toLocaleLowerCase()
    .indexOf(filtertext)!==-1):value;
  }


}