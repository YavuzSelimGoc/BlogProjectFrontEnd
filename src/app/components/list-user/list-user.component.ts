import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit{
  user:User[]
  constructor(private httpClient:HttpClient,private authService:AuthService){}
  ngOnInit(): void {
   this.getUser()
  }
  getUser() {
    this.authService.getUser().subscribe(repsonse => {
      this.user = repsonse.data  
   
    })
  }
  deleteBox(user:User)
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
        this.delete(user);
        setTimeout(window.location.href="/admin/listUser",3000);
        
       
      }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Sil!","Silme İşleminden Vazgeçildi","error")
      }
    }))
  }
  delete(user:User){
    this.authService.delete(user).subscribe(response=>{
    
    });
  }

}
