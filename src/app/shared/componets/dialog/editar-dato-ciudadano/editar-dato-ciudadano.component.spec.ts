import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDatoCiudadanoComponent } from './editar-dato-ciudadano.component';

describe('EditarDatoCiudadanoComponent', () => {
  let component: EditarDatoCiudadanoComponent;
  let fixture: ComponentFixture<EditarDatoCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarDatoCiudadanoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarDatoCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
