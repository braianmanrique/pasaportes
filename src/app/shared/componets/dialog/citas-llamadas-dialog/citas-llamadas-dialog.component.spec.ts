import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasLlamadasDialogComponent } from './citas-llamadas-dialog.component';

describe('CitasLlamadasDialogComponent', () => {
  let component: CitasLlamadasDialogComponent;
  let fixture: ComponentFixture<CitasLlamadasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasLlamadasDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasLlamadasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
