import { CategoryService } from './../../services/category.service';
import { BlogService } from './../../services/blog.service';
import { HttpClient } from '@angular/common/http';
import { Category } from './../../models/category';
import { Blog } from './../../models/blog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit{
  blogUpdateForm:FormGroup
  sayac=0
  blogImage:string
 
  blog:Blog;
  category:Category[]
  public resp: {dbPath:''};
  blogId:number;

  constructor(private httpClient:HttpClient,private BlogService:BlogService,
    private formBuilder:FormBuilder,private activatedroute:ActivatedRoute,private router:Router,private categoryService:CategoryService) { this.createBlogUpdateForm() }
    ngOnInit(): void {
      this.activatedroute.params.subscribe(params=>{
        if(params["blogId"]){
          this.blogId=params["blogId"]
          this.getBlogById(params["blogId"])
          this.getCategory()
          }
        else{this.getBlogById(params["blogId"])}
        this.blogId=params["blogId"]
        this.getCategory()
        })
    }
  getCategory() {
    this.categoryService.getCategory().subscribe(repsonse => {
      this.category = repsonse.data  
    })
  }
  getBlogById(blogId:number){
    this.BlogService.getBlogById(blogId).subscribe((response) => {
      this.blog=response.data;
      this.blogImage=this.blog.blogImage
      
      this.createProductAddForm();
    });
  }
  createBlogUpdateForm(){
    this.blogUpdateForm=this.formBuilder.group({
      blogId:["",Validators.required],
      categoryId:["",Validators.required],
      blogTitle:[null,Validators.required],
      blogText:[null,Validators.required],
      blogFaq:[null,Validators.required],
      blogContent:["",Validators.required],
      blogWriter:["",Validators.required],
      blogUrl:["",Validators.required],
      blogTag:["",Validators.required],
      metaTitle:["",Validators.required],
      metaDescription:["",Validators.required],
      blogDate:["",Validators.required],
      blogImage:["",Validators.required],
      blogStatus:[true,Validators.required],
    })
  }
  updateBox()
  {
    Swal.fire({
      title:"Emin Misiniz",
      text:"Güncellemek İstediğinize Emin Misiniz ?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:'Evet, Güncellensin',
      cancelButtonText:'Hayır, Güncellenmesin'
    }).then((result=>{
      if(result.value){
        Swal.fire("Güncellendi","Güncelleme işlemi başarılı","success")
        this.update();
       
      }
      else if (result.dismiss===Swal.DismissReason.cancel){
        Swal.fire("Güncellenmedi!","Güncelleme İşleminden Vazgeçildi","error")
      }
    }))
  }
  update(){
    if(this.sayac===0)
    { this.resp={
      dbPath:null
    }
    this.blogUpdateForm.controls['blogImage'].setValue(this.blogImage);
    if(this.blogUpdateForm.valid){
      let blogModel =Object.assign({},this.blogUpdateForm.value) 
      this.BlogService.update(blogModel).subscribe(response=>{
        this.router.navigate(["/admin/listBlog"])
        
      });
    }
    else {
      
    } }
    else if(this.sayac!==0){
      this.blogUpdateForm.controls['blogImage'].setValue(this.resp.dbPath);
    if(this.blogUpdateForm.valid){
      let blogModel =Object.assign({},this.blogUpdateForm.value) 
      this.BlogService.update(blogModel).subscribe(response=>{
        this.router.navigate(["/admin/listBlog"])
      });
    }
    else {} 
    }
   
  }

  createProductAddForm(){
    this.blogUpdateForm=this.formBuilder.group({
      blogId:[this.blog.blogId],
      categoryId:[this.blog.categoryId],
      blogTitle:[this.blog.blogTitle],
      blogText:[this.blog.blogText],
      blogFaq:[this.blog.blogFaq],
      blogContent:[this.blog.blogContent],
      blogWriter:[this.blog.blogWriter],
      blogUrl:[this.blog.blogUrl],
      blogTag:[this.blog.blogTag],
      metaTitle:[this.blog.metaTitle],
      metaDescription:[this.blog.metaDescription],
      blogDate:[this.blog.blogDate],
      blogImage:[this.blog.blogImage],
      blogStatus:[this.blog.blogStatus],
    })
  }
  uploadFinished = (event) => { 
    this.sayac++
      this.resp = event; 
  }

   createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }



  }

