import { ToastrService } from 'ngx-toastr';
import { BlogService } from './../../services/blog.service';
import { CategoryService } from './../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Category } from './../../models/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as Editor from 'ckeditor5/build/ckeditor';
import { Blog } from 'src/app/models/blog';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit{
  blogAddForm:FormGroup;
  blog:Blog[]
  isTrue:boolean
  public resp: {dbPath:''};
  category:Category[]
  public Editor = Editor;
  constructor(private httpClient:HttpClient,private formBuilder:FormBuilder,private toastrService:ToastrService,private categoryService:CategoryService,private blogService:BlogService,private router:Router) { }
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
      blogText :["",Validators.required],
      metaTitle :["",Validators.required],
      metaDescription :["",Validators.required],
      blogUrl :["",Validators.required],
      blogTag :["",Validators.required],
      
    })
  }
  chechkUrl(el) {
 
    if (el.value != "") {
      this.isTrue=false
      this.blogService.getBlogs().subscribe(repsonse => {
        this.blog = repsonse.data
        this.blog.forEach(element => {
          if(element.blogUrl===el.value)
          {
            this.isTrue=true
            this.toastrService.error("Aynı Url Yapısına Sahip Bir Blog Var Lütfen Başka Şekilde İsimlendirin","Hata")
          }
          else{
        
          }
        });
      })
    
      }
  }

add(){

   if(this.isTrue===true)
   {
    this.toastrService.error("Aynı Url Yapısına Sahip Bir Blog Var Lütfen Başka Şekilde İsimlendirin ","Hata")
   }  
   else {

    this.blogAddForm.controls['blogImage'].setValue(this.resp.dbPath);
    if(this.blogAddForm.valid){
      let productModel =Object.assign({},this.blogAddForm.value) 
      this.blogService.add(productModel).subscribe(response=>{
        this.router.navigate(["/admin/listBlog"])
        this.toastrService.success("Blog Ekleme İşlemi Başarılı","Tebrikler")
      
      });
    }
    else {
      console.log("Kategori Eklenemedi");
        this.toastrService.error("Blog Ekleme İşlemi Başarısız","Hata")
    }  
   }
  }

  uploadFinished = (event) => { 
    this.resp = event; 
  }

   createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
    
  }
  editorConfig = {

    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
      ]
    },
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: environment.apiUrl+'api/upload',

  },
    language: 'tr',
    licenseKey: '',


  };

}
