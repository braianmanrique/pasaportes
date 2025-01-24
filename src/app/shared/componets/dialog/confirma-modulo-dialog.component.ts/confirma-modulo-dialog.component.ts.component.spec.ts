import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaModuloDialogComponentTsComponent } from './confirma-modulo-dialog.component.ts.component';

describe('ConfirmaModuloDialogComponentTsComponent', () => {
  let component: ConfirmaModuloDialogComponentTsComponent;
  let fixture: ComponentFixture<ConfirmaModuloDialogComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmaModuloDialogComponentTsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmaModuloDialogComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
