import { Component, OnInit, VERSION } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BlogProject';

  constructor(private metaTagService:Meta){}

  ngOnInit(): void {
   this.metaTagService.addTags([
    { name:'keywords',content:'Angular, Angular SEO'},
    { name:'robots',content:'index, follow'},
    { name:'author',content:'Ark Soft'},
    { name:'viewport',content:'width=device-width'},
    { charset:'UTF-8'},
    
   ]);
  }
}
