import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { BlogDto } from 'src/app/models/blogDto';
declare const $: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: BlogDto[]
  isTrue:boolean
  last3blog: Blog[]
  pages: number
  categoryId:number
  sayfalar: number[]
  
  currentPage:number;

  constructor(private blogService: BlogService,private metaTagService:Meta,private title:Title,  private httpClient: HttpClient, private router: RouterModule,private activatedroute:ActivatedRoute,) { }

  ngOnInit(): void {

    this.title.setTitle("Bloglar-Aksoft")
    this.metaTagService.addTags([
      { name:'description',content:'Angular, Angular SEO'},
      { name:'robots',content:'blog, blogcontent'},
      { name:'author',content:'Ark Soft'},
      { name:'viewport',content:'width=device-width'},
     ]);
    this.activatedroute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.isTrue=true
        this.categoryId=params["categoryId"]
        if (this.getQuery("page") === null) {
          this.currentPage = 0;
          this.getBlogsByCategory(this.currentPage,this.categoryId)
          this.getLast3Blog()
          this.getCountByCategoryId(this.categoryId);
        }
        else {
          this.isTrue=true
          this.currentPage = Number(this.getQuery("page"));
          this.getBlogsByCategory(this.currentPage,this.categoryId)
          this.getLast3Blog()
          this.getCountByCategoryId(this.categoryId);
        }
      }
      else{
        this.isTrue=false
        if (this.getQuery("page") === null) {
          this.currentPage = 0;
          this.getBlogs(this.currentPage)
          this.getLast3Blog()
          this.getCount();
        }
        else {
          this.isTrue=false
          this.currentPage = Number(this.getQuery("page"));
          this.getBlogs(this.currentPage)
          this.getLast3Blog()
          this.getCount();
        }
      }
      })

  

  }

  getQuery(q) {
    return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
  }

  getCount() {
    this.blogService.getCountActive().subscribe(repsonse => {
      this.pages = repsonse
      this.sayfalar = []
      for (let i = 0; i < this.pages; i++) {
        this.sayfalar.push(i)
      }
    })
  }
  getCountByCategoryId(categoryId:number) {
    this.blogService.getCountByCategoryId(categoryId).subscribe(repsonse => {
      this.pages = repsonse
      this.sayfalar = []
      for (let i = 0; i < this.pages; i++) {
        this.sayfalar.push(i)
      }
    })


  }
  getBlogs(page) {
    this.blogService.getBlogsActiveDto(page).subscribe(repsonse => {
      this.blogs = repsonse.data
   
      this.blogs.forEach(blog => {
        if (blog.blogContent.length >= 180)
          blog.blogContent = blog.blogText.slice(0, 180) + '(...)'
      });
    })
  }
  getBlogsByCategory(page:number,categoryId:number) {
    this.blogService.getBlogsDtoByCategoryId(categoryId,page).subscribe(repsonse => {
      this.blogs = repsonse.data
      this.blogs.forEach(blog => {
        if (blog.blogContent.length >= 180)
          blog.blogContent = blog.blogText.slice(0, 180) + '(...)'
      });
    })
  }
  getLast3Blog() {
    this.blogService.getLast3Post().subscribe(repsonse => {
      this.last3blog = repsonse.data
    })
  }


  createImgPath = (serverPath: string) => {
    if (serverPath) {
      serverPath = serverPath.split(String.fromCharCode(92)).join("/");
      serverPath = serverPath.replace("wwwroot/", "");
    }
    return environment.imgUrl + `${serverPath}`;
  }
}
