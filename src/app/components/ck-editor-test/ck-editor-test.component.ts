import * as Editor from 'ckeditor5/build/ckeditor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ck-editor-test',
  templateUrl: './ck-editor-test.component.html',
  styleUrls: ['./ck-editor-test.component.scss']
})

export class CkEditorTestComponent implements OnInit{
  ckAddForm:FormGroup;

  ckEditorConfig: any = { toolbar: [
    ['Source', 'Templates', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'],
    [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],
    [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ],
    [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ],
    [ 'Link', 'Unlink', 'Anchor' ],
    [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ],
    [ 'Styles', 'Format', 'Font', 'FontSize' ],
    [ 'TextColor', 'BGColor' ],
    [ 'Maximize', 'ShowBlocks' ]
    ] };
  constructor(private httpClient:HttpClient,
    private route: ActivatedRoute,  private location: Location,private formBuilder:FormBuilder,private toastrService:ToastrService,private categoryService:CategoryService,private router:Router) { }
  ngOnInit(): void {
 
  //  this.clk()
  
  }
  // clk(){
  //   this.location.replaceState(window.location.pathname+`/yavuz`);
  // }
  public Editor = Editor;
  createCategoryAddForm(){
    this.ckAddForm=this.formBuilder.group({
      content:["",Validators.required],
    })
  }
  add(){
    console.log(this.ckAddForm.value)
    if(this.ckAddForm.valid){
      let categoryModel =Object.assign({},this.ckAddForm.value) 
    
    }
  }

}
