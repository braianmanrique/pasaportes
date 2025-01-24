import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarModuloComponent } from './seleccionar-modulo.component';

describe('SeleccionarModuloComponent', () => {
  let component: SeleccionarModuloComponent;
  let fixture: ComponentFixture<SeleccionarModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeleccionarModuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionarModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
