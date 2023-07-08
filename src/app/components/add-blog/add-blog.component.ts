import { BlogService } from './../../services/blog.service';
import { CategoryService } from './../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit{
  blogAddForm:FormGroup;
  public resp: {dbPath:''};
  category:Category[]
  constructor(private httpClient:HttpClient,private formBuilder:FormBuilder,private categoryService:CategoryService,private blogService:BlogService,private router:Router) { }
  ngOnInit(): void {
   this.createBlogAddForm()
   this.getCategory()
  }
  getCategory() {
    this.categoryService.getCategory().subscribe(repsonse => {
      this.category = repsonse.data  
    })
  }
  createBlogAddForm(){
    this.blogAddForm=this.formBuilder.group({
      categoryId :["",Validators.required],
      blogTitle :["",Validators.required],
      blogImage :["",Validators.required],
      blogContent :["",Validators.required],
      blogWriter :["",Validators.required],
      blogTag :["",Validators.required],
      
    })
  }

add(){
  console.log(this.blogAddForm.value)
    this.blogAddForm.controls['blogImage'].setValue(this.resp.dbPath);
    if(this.blogAddForm.valid){
      let productModel =Object.assign({},this.blogAddForm.value) 
      this.blogService.add(productModel).subscribe(response=>{
        this.router.navigate(["/admin/listBlog"])
      });
    }
    else {
      console.log("Kategori Eklenemedi");
    } 
  }
  uploadFinished = (event) => { 
    this.resp = event; 
  }

   createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
    
  }

}
