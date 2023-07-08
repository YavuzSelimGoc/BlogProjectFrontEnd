import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs: Blog[]
  last3blog: Blog[]
  pages: number
  sayfalar: number[]
  currentPage:number;

  constructor(private blogService: BlogService,  private httpClient: HttpClient, private router: RouterModule) { }

  ngOnInit(): void {

    if (this.getQuery("page") === null) {
      this.currentPage = 0;
      this.getBlogs(this.currentPage)
      this.getLast3Blog()
      
      this.getCount();
    }
    else {
      this.currentPage = Number(this.getQuery("page"));
      this.getBlogs(this.currentPage)
      this.getLast3Blog()
     
      this.getCount();
    }

  }

  getQuery(q) {
    return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
  }

  getCount() {
    this.blogService.getCount().subscribe(repsonse => {
      this.pages = repsonse
      this.sayfalar = []
      for (let i = 0; i < this.pages; i++) {
        this.sayfalar.push(i)
      }
    })


  }

  getBlogs(page) {
    this.blogService.getBlogsActive(page).subscribe(repsonse => {
      this.blogs = repsonse.data
      this.blogs.forEach(blog => {
        if (blog.blogContent.length >= 180)
          blog.blogContent = blog.blogContent.slice(0, 175) + '(...)'
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
