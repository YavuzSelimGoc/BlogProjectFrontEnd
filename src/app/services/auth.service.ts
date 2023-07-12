import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Login } from '../models/login';
import { SingleResponseModel } from '../models/singleresponse';
import { TokenModel } from '../models/token';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private httpclient:HttpClient) { }
  login(loginModel:Login){
    return this.httpclient.post<TokenModel>
    (this.apiUrl+"api/auth/login",loginModel)
  }
  delete(user:User){
    let newPath=this.apiUrl + "api/auth/delete"
    return this.httpclient.post(newPath,user)
   }
   getUser():Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"api/auth/getall";
    return this.httpclient.get<ListResponseModel<User>>(newPath)
  }

   update(user:User){
    let newPath=this.apiUrl+"api/auth/update";
    return this.httpclient.post(newPath,user)
   }
  add(user:User){ 
    let newPath=this.apiUrl+"api/Auth/register";
    return this.httpclient.post(newPath,user)
   }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
