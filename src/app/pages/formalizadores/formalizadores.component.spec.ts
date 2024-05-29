import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalizadoresComponent } from './formalizadores.component';

describe('FormalizadoresComponent', () => {
  let component: FormalizadoresComponent;
  let fixture: ComponentFixture<FormalizadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormalizadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormalizadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
