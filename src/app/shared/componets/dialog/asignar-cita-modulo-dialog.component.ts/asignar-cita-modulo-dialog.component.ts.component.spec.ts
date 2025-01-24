import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCitaModuloDialogComponentTsComponent } from './asignar-cita-modulo-dialog.component.ts.component';

describe('AsignarCitaModuloDialogComponentTsComponent', () => {
  let component: AsignarCitaModuloDialogComponentTsComponent;
  let fixture: ComponentFixture<AsignarCitaModuloDialogComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarCitaModuloDialogComponentTsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarCitaModuloDialogComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
