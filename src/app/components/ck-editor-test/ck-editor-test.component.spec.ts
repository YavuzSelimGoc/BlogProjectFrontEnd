import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkEditorTestComponent } from './ck-editor-test.component';

describe('CkEditorTestComponent', () => {
  let component: CkEditorTestComponent;
  let fixture: ComponentFixture<CkEditorTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkEditorTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkEditorTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
