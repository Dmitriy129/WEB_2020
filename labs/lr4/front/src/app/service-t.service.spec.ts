import { TestBed } from '@angular/core/testing';

import { ServiceTService } from './service-t.service';

describe('ServiceTService', () => {
  let service: ServiceTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
