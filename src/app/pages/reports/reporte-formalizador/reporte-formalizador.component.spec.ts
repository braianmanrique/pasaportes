import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFormalizadorComponent } from './reporte-formalizador.component';

describe('ReporteFormalizadorComponent', () => {
  let component: ReporteFormalizadorComponent;
  let fixture: ComponentFixture<ReporteFormalizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteFormalizadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteFormalizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
