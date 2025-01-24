import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsSectionComponentComponent } from './charts-section-component.component';

describe('ChartsSectionComponentComponent', () => {
  let component: ChartsSectionComponentComponent;
  let fixture: ComponentFixture<ChartsSectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartsSectionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartsSectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
