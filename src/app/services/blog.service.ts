import { Blog } from './../models/blog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ResponseModel_Data } from '../models/responseModel_Data';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  apiUrl=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(blog:Blog){
    let newPath=this.apiUrl+"Blog/add";
    return this.httpClient.post(newPath,blog)
   }

   getBlogs():Observable<ListResponseModel<Blog>>{
    let newPath=this.apiUrl+"Blog/getall";
    return this.httpClient.get<ListResponseModel<Blog>>(newPath)
  }
  getCount():Observable<number> {
    let newPath=this.apiUrl+"Blog/getCount";
    return this.httpClient
       .get<number>(newPath)
   }
  getBlogsActive(page:number):Observable<ListResponseModel<Blog>>{
    let newPath=this.apiUrl+"Blog/getallActive?page="+page;
    return this.httpClient.get<ListResponseModel<Blog>>(newPath)
  }
  getLast3Post():Observable<ListResponseModel<Blog>>{
    let newPath=this.apiUrl+"Blog/getlast3post";
    return this.httpClient.get<ListResponseModel<Blog>>(newPath)
  }
   update(blog:Blog){
    let newPath=this.apiUrl+"blog/update";
    return this.httpClient.post(newPath,blog)
   }

   getBlogById(blogID):Observable <ResponseModel_Data<Blog>> {
    let newPath=this.apiUrl + "Blog/GetById/?id="+blogID
    return this.httpClient
       .get<ResponseModel_Data<Blog>>(newPath);
   }
   delete(blog:Blog){
    let newPath=this.apiUrl + "blog/delete"
    return this.httpClient.post(newPath,blog)
   }
   passive(blog:Blog){
    let newPath=this.apiUrl + "blog/passive"
    return this.httpClient.post(newPath,blog)
   }
   active(blog:Blog){
    let newPath=this.apiUrl + "blog/active"
    return this.httpClient.post(newPath,blog)
   }

   
}