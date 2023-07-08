import { ListCategoryComponent } from './components/list-category/list-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { BlogComponent } from './components/blog/blog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { IndexComponent } from './components/index/index.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ListBlogComponent } from './components/list-blog/list-blog.component';

const routes: Routes = [
  {
    path: "", component: PublicLayoutComponent, children: [
      {path:"",pathMatch:"full",component:BlogComponent},
   
    ]
  },
  {
    path: "login", component: LoginComponent, children: [
      { path: "", pathMatch: "full", component: LoginComponent },
      { path: "login", component: LoginComponent },
    ]
  },
  {
    path: "admin", component: PrivateLayoutComponent, children: [
     { path: "addCategory", pathMatch: "full", component: AddCategoryComponent },
     { path: "addBlog", pathMatch: "full", component: AddBlogComponent },
     { path: "listCategory",  component: ListCategoryComponent },
     { path: "listBlog",  component: ListBlogComponent },
     {path:"updateCategory/category/:categoryId",component:UpdateCategoryComponent},
     
 
    ]
  }



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }