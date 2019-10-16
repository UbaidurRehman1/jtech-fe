import { TestBed } from '@angular/core/testing';

import { WebsocketApiService } from './websocket-api.service';

describe('WebsocketApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketApiService = TestBed.get(WebsocketApiService);
    expect(service).toBeTruthy();
  });
});
