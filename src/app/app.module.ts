import { BlogPipe } from './pipe/blog.pipe';
import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { BlogComponent } from './components/blog/blog.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ListBlogComponent } from './components/list-blog/list-blog.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';

import { CategoryPipe } from './pipe/category.pipe';
import { AdminIndexComponent } from './components/admin-index/admin-index.component';
import { CkEditorTestComponent } from './components/ck-editor-test/ck-editor-test.component';
import { RegisterComponent } from './components/register/register.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { ListUserComponent } from './components/list-user/list-user.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    LoginComponent,
    IndexComponent,
    AddCategoryComponent,
    UploadsComponent,
    HeaderComponent,
    FooterComponent,
    AdminHeaderComponent,
    AdminNavbarComponent,
    BlogComponent,
    ListCategoryComponent,
    UpdateCategoryComponent,
    AddBlogComponent,
    ListBlogComponent,
    UpdateBlogComponent,
    BlogDetailsComponent,
    BlogPipe,
    CategoryPipe,
    AdminIndexComponent,
    CkEditorTestComponent,
    RegisterComponent,
    AddRoleComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
