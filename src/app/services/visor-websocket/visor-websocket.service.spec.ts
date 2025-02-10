import { TestBed } from '@angular/core/testing';

import { VisorWebsocketService } from './visor-websocket.service';

describe('VisorWebsocketService', () => {
  let service: VisorWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisorWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
