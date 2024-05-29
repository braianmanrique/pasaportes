import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPrioritariasComponent } from './citas-prioritarias.component';

describe('CitasPrioritariasComponent', () => {
  let component: CitasPrioritariasComponent;
  let fixture: ComponentFixture<CitasPrioritariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasPrioritariasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasPrioritariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
