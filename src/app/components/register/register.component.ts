import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  userAddForm:FormGroup
  constructor(private httpClient:HttpClient,private userService:AuthService,private toastrService:ToastrService,private formBuilder:FormBuilder,private router:Router) { }
  ngOnInit(): void {
    this.createUserdAddForm();
  }
  createUserdAddForm(){
    this.userAddForm=this.formBuilder.group({
      firstName :["",Validators.required],
      lastName :["",Validators.required],
          userName :["",Validators.required],
          password :["",Validators.required],

    })
}
add(){  
  
  if(this.userAddForm.valid){
    let blogModel =Object.assign({},this.userAddForm.value) 
    this.userService.add(blogModel).subscribe(response=>{
      this.toastrService.success("Kullanıcı Kaydı Başarılı","Başarılı")
    });
  }
  else {
    
  } 
}
}