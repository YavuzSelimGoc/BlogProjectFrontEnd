import { Category } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit{
  filtertext="";
  slug:any
  blog:Blog;
  blogs:Blog[];
  category:Category[]
  categorys:Category
  tags:string[]
  veri="BU BİR DENEME VERİSİDİR"
  categoryName:string
  post:Blog[]
  constructor(private httpClient:HttpClient,private BlogService:BlogService,private location:Location,
    private formBuilder:FormBuilder,private activatedroute:ActivatedRoute,private renderer: Renderer2,private metaTagService:Meta,private title:Title, private router:Router,private categoryService:CategoryService) {  }
    ngOnInit(): void {

    
      this.activatedroute.params.subscribe(params=>{
        if(params["blogUrl"]){
          
          this.getBlogBySlug(params["blogUrl"])
          this.getCategory()
        
         this.getBlogLast5Post()
          }
        else{this.getBlogBySlug(params["blogUrl"])}
        this.getBlogLast5Post()
        this.getCategory()
      
        })
        
    }
    getCategory() {
      this.categoryService.getCategory().subscribe(repsonse => {
        this.category = repsonse.data  
      })
    }
    
    getCategoryById(id:number) {
      this.categoryService.getCategoryById(id).subscribe(repsonse => {
        this.categorys = repsonse.data  
        this.categoryName=this.categorys.categoryName
     
      })
    }
 
    
    // getBlogById(blogId:number){
    //   this.BlogService.getBlogById(blogId).subscribe((response) => {
    //     this.blog=response.data;
    //     this.title.setTitle(this.blog.metaTitle)
    //     this.metaTagService.addTags([
    //       { name:'description',content:this.blog.metaDescription},
    //       { name:'robots',content:'blog, blogcontent'},
    //       { name:'author',content:'ArkSoft'},
    //       { name:'viewport',content:'width=device-width'},
    //      ]);

    //     this.tags=this.blog.blogTag.split(",")
    //     this.getCategoryById(this.blog.categoryId)
        
    //   });
    // }
    getBlogBySlug(slug:string){
      this.BlogService.getBlogBySlug(slug).subscribe((response) => {
        this.blog=response.data;
        this.title.setTitle(this.blog.metaTitle)
        this.metaTagService.addTags([
          { name:'description',content:this.blog.metaDescription},
          { name:'robots',content:'blog, blogcontent'},
          { name:'author',content:'ArkSoft'},
          { name:'viewport',content:'width=device-width'},
         ]);
        

        this.tags=this.blog.blogTag.split(",")
        this.getCategoryById(this.blog.categoryId)

        const script = this.renderer.createElement('script');
        const veri = this.blog.blogFaq; 
        const text = this.renderer.createText(veri);
        this.renderer.appendChild(script, text);
        this.renderer.appendChild(document.body, script);

        const script2 = this.renderer.createElement('script');
        const veri2 = this.blog.blogFaq; 
        const text2 = this.renderer.createText(veri2);
        this.renderer.appendChild(script2, text2);
        this.renderer.appendChild(document.head, script2);
      
  
      });
    }

    getBlogLast5Post(){
      this.BlogService.getLast3Post().subscribe((response) => {
        this.post=response.data;
    
      });
    }
    createImgPath = (serverPath: string) => {
      if (serverPath) {
        serverPath = serverPath.split(String.fromCharCode(92)).join("/");
        serverPath = serverPath.replace("wwwroot/", "");
      }
      return environment.imgUrl + `${serverPath}`;
    }

}
