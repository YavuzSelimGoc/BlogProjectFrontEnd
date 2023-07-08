import { environment } from '../../../environments/environment';
import { Blog } from './../../models/blog';
import { BlogService } from './../../services/blog.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit{
  blog:Blog[]
  constructor(private httpClient:HttpClient,private blogService:BlogService){ }
  ngOnInit(): void {
    this.getBlogs()
  }
  getBlogs() {
    this.blogService.getBlogs().subscribe(repsonse => {
      this.blog = repsonse.data
      this.blog.forEach(blog => {
        if (blog.blogContent.length >= 180)
          blog.blogContent = blog.blogContent.slice(0, 175) + '(...)'
      });
    })
  }
  delete(blog:Blog){
    this.blogService.delete(blog).subscribe(response=>{
    
    });
  }
  passive(blog:Blog){
    this.blogService.passive(blog).subscribe(response=>{
    
    });
  }
  active(blog:Blog){
   this.blogService.active(blog).subscribe(response=>{
   });
  
  }
  createImgPath = (serverPath: string) => {
    if (serverPath) {
      serverPath = serverPath.split(String.fromCharCode(92)).join("/");
      serverPath = serverPath.replace("wwwroot/", "");
    }
    return environment.imgUrl + `${serverPath}`;
  }
}
