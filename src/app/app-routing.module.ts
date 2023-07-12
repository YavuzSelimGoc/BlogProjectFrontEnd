import { RegisterComponent } from './components/register/register.component';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
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
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { LoginGuard } from './guards/login.guard';
import { CkEditorTestComponent } from './components/ck-editor-test/ck-editor-test.component';
import { ListUserComponent } from './components/list-user/list-user.component';

const routes: Routes = [
  {
    path: "", component: PublicLayoutComponent, children: [
      {path:"",pathMatch:"full",component:BlogComponent},
      {path:"blog",component:BlogComponent},
      {path:"blogs/:categoryId",component:BlogComponent},
      {path:"blog/:blogUrl",component:BlogDetailsComponent},
      {path:"ck",component:CkEditorTestComponent},
   
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
     { path: "", pathMatch: "full", component: AdminIndexComponent,canActivate:[LoginGuard] },
     { path: "addCategory", pathMatch: "full", component: AddCategoryComponent,canActivate:[LoginGuard] },
     { path: "addBlog", pathMatch: "full", component: AddBlogComponent ,canActivate:[LoginGuard]},
     { path: "listCategory",  component: ListCategoryComponent ,canActivate:[LoginGuard]},
     { path: "listBlog",  component: ListBlogComponent ,canActivate:[LoginGuard]},
     {path:"updateCategory/category/:categoryId",component:UpdateCategoryComponent,canActivate:[LoginGuard]},
     {path:"updateBlog/blog/:blogId",component:UpdateBlogComponent,canActivate:[LoginGuard]},
     {path:"register",component:RegisterComponent},
     {path:"listUser",component:ListUserComponent},
   
     
 
    ]
  }



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }