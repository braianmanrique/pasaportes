import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCarnetComponent } from './citas-carnet.component';

describe('CitasCarnetComponent', () => {
  let component: CitasCarnetComponent;
  let fixture: ComponentFixture<CitasCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasCarnetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitasCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
