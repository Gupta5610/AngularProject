import { TestBed, inject } from '@angular/core/testing';

import { CustomerServicesService } from './customer-services.service';

describe('CustomerServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerServicesService]
    });
  });

  it('should be created', inject([CustomerServicesService], (service: CustomerServicesService) => {
    expect(service).toBeTruthy();
  }));
});
