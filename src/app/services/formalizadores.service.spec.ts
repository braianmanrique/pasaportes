import { TestBed } from '@angular/core/testing';

import { FormalizadoresService } from './formalizadores.service';

describe('FormalizadoresService', () => {
  let service: FormalizadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormalizadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
