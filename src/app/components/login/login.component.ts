import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,private metaTagService:Meta,private authService:AuthService,private router:Router ,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.metaTagService.addTags([
      { name:'keywords',content:'Angular, Angular SEO'},
      { name:'robots',content:'Login, LoginWord , PrivateLogin'},
      { name:'author',content:'Yavuz'},
      { name:'viewport',content:'width=device-width'},
     
     ]);
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName: ["",Validators.required],
      password:["",Validators.required]
    })
  }
  
    login(){
      if(this.loginForm.valid){
      
        let loginModel = Object.assign({},this.loginForm.value)
        this.authService.login(loginModel).subscribe(response=>{
          this.toastrService.success("Giriş İşlemi Başarılı")
          localStorage.setItem("token",response.token)
          localStorage.setItem("username",response.userName)
          this.router.navigate(["/admin"])
        },responseError=>{
          console.log(responseError)
          // this.toastrService.error("Giriş Bilgileri Yanlış")
          this.toastrService.error("Giriş Bilgileri Yanlış")
        })
      }
     
    }
  
}