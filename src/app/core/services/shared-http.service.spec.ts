import { TestBed } from '@angular/core/testing';

import { SharedHTTPService } from './shared-http.service';

describe('SharedHTTPService', () => {
  let service: SharedHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
