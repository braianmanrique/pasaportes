import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAdminPasaportesComponent } from './reporte-admin-pasaportes.component';

describe('ReporteAdminPasaportesComponent', () => {
  let component: ReporteAdminPasaportesComponent;
  let fixture: ComponentFixture<ReporteAdminPasaportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteAdminPasaportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteAdminPasaportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
