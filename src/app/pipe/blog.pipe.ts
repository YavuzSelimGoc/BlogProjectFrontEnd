import { Pipe, PipeTransform } from '@angular/core';
import { Blog } from '../models/blog';

@Pipe({
  name: 'blog'
})
export class BlogPipe implements PipeTransform {

  
    transform(value: Blog[], filtertext: string): Blog[] {
      filtertext=filtertext?filtertext.toLocaleLowerCase():""
      return filtertext?value.filter((p:Blog)=>p.blogTitle.toLocaleLowerCase()
      .indexOf(filtertext)!==-1):value;
    }
  

}