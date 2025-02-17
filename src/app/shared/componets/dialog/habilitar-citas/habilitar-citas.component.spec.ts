import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarCitasComponent } from './habilitar-citas.component';

describe('HabilitarCitasComponent', () => {
  let component: HabilitarCitasComponent;
  let fixture: ComponentFixture<HabilitarCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HabilitarCitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabilitarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
