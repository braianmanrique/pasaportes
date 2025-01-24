import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarCitaDialogComponent } from './reasignar-cita-dialog.component';

describe('ReasignarCitaDialogComponentTsComponent', () => {
  let component: ReasignarCitaDialogComponent;
  let fixture: ComponentFixture<ReasignarCitaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReasignarCitaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReasignarCitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
