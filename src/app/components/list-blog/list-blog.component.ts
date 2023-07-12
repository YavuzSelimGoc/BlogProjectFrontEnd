import { BlogDto } from 'src/app/models/blogDto';
import { environment } from '../../../environments/environment';
import { Blog } from './../../models/blog';
import { BlogService } from './../../services/blog.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit{
  blog:BlogDto[]
  filtertext="";
  sayfalar: number[]
  pages: number
  currentPage:number;
  constructor(private httpClient:HttpClient,private blogService:BlogService){ }
  ngOnInit(): void {
    if (this.getQuery("page") === null) {
      this.currentPage = 0;
      this.getBlogs(this.currentPage)
     
      this.getCount();
    }
    else {
     
      this.currentPage = Number(this.getQuery("page"));
      this.getBlogs(this.currentPage)
      
      this.getCount();
    }
   
  }
  getBlogs( page:number) {
    this.blogService.getBlogsDto(page).subscribe(repsonse => {
      this.blog = repsonse.data
      this.blog.forEach(blog => {
        if (blog.blogContent.length >= 180)
          blog.blogContent = blog.blogContent.slice(0, 15) + '(...)'
      });
    })
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
  deleteBox(blog:Blog)
  {
    Swal.fire({
      title:"Emin Misiniz",
      text:"Silmek İstediğinize Emin Misiniz  ?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:'Evet, Silinsin',
      cancelButtonText:'Hayır, Silinmesin'
    }).then((result=>{
      if(result.value){
        Swal.fire("Sil","Silme işlemi başarılı","success")
        this.delete(blog);
        setTimeout(window.location.href="/admin/listBlog",5000);
        
      }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Sil!","Silme İşleminden Vazgeçildi","error")
      }
    }))
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
