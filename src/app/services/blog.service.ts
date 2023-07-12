import { BlogDto } from './../models/blogDto';
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
  getBlogsByCategoryId(categoryId:number,pages:number):Observable<ListResponseModel<Blog>>{
    let newPath=this.apiUrl+"Blog/GetByCategoryId?categoryId="+categoryId+"&page="+pages;
    return this.httpClient.get<ListResponseModel<Blog>>(newPath)
  }
  getCount():Observable<number> {
    let newPath=this.apiUrl+"Blog/getCount";
    return this.httpClient
       .get<number>(newPath)
   }
   getCountActive():Observable<number> {
    let newPath=this.apiUrl+"Blog/getCountActive";
    return this.httpClient
       .get<number>(newPath)
   }
   getCountByCategoryId(categoryId:number):Observable<number> {
    let newPath=this.apiUrl+"Blog/getCountByCategory?categoryId="+categoryId;
    return this.httpClient
       .get<number>(newPath)
   }
  getBlogsActive(page:number):Observable<ListResponseModel<Blog>>{
    let newPath=this.apiUrl+"Blog/getallActive?page="+page;
    return this.httpClient.get<ListResponseModel<Blog>>(newPath)
  }
  getBlogsActiveDto(page:number):Observable<ListResponseModel<BlogDto>>{
    let newPath=this.apiUrl+"Blog/getBlogActiveDto?page="+page;
    return this.httpClient.get<ListResponseModel<BlogDto>>(newPath)
  }
  getBlogsDto(page:number):Observable<ListResponseModel<BlogDto>>{
    let newPath=this.apiUrl+"Blog/getBlogDto?page="+page;
    return this.httpClient.get<ListResponseModel<BlogDto>>(newPath)
  }
  getBlogsDtoByCategoryId(categoryId:number,pages:number):Observable<ListResponseModel<BlogDto>>{
    let newPath=this.apiUrl+"Blog/GetByCategoryIdDto?categoryId="+categoryId+"&page="+pages;
    return this.httpClient.get<ListResponseModel<BlogDto>>(newPath)
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
   getBlogBySlugDto(slug:string):Observable <ResponseModel_Data<Blog>> {
    let newPath=this.apiUrl + "Blog/GetBySlugDto/?slug="+slug
    return this.httpClient
       .get<ResponseModel_Data<Blog>>(newPath);
   }
   getBlogBySlug(slug:string):Observable <ResponseModel_Data<Blog>> {
    let newPath=this.apiUrl + "Blog/GetBySlug/?slug="+slug
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