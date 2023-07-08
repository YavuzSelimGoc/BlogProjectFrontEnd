import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService:AuthService , 
    private router:Router, private toastrService:ToastrService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isAuthenticated())
      {
        return true;
      }
      else{
        this.router.navigate(["/login"])
       this.toastrService.error("Yetkiniz Yok Lütfen Giriş Yapınız");
        return false;
      }
  }
  
}