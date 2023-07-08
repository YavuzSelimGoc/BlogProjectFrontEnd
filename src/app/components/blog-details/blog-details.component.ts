import { Category } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit{
  
  blog:Blog;
  category:Category[]
  blogId:number
  tags:string[]
  post:Blog[]
  constructor(private httpClient:HttpClient,private BlogService:BlogService,
    private formBuilder:FormBuilder,private activatedroute:ActivatedRoute,private router:Router,private categoryService:CategoryService) {  }
    ngOnInit(): void {
      this.activatedroute.params.subscribe(params=>{
        if(params["blogId"]){
          this.blogId=params["blogId"]
          this.getBlogById(params["blogId"])
          this.getCategory()
          this.getBlogLast5Post()
          }
        else{this.getBlogById(params["blogId"])}
        this.blogId=params["blogId"]
        this.getCategory()
        this.getBlogLast5Post()
        })
    }
    getCategory() {
      this.categoryService.getCategory().subscribe(repsonse => {
        this.category = repsonse.data  
      })
    }
    getBlogById(blogId:number){
      this.BlogService.getBlogById(blogId).subscribe((response) => {
        this.blog=response.data;
        this.tags=this.blog.blogTag.split(",")
      });
    }
    getBlogLast5Post(){
      this.BlogService.getLast3Post().subscribe((response) => {
        this.post=response.data;
    
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
