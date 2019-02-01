import { TestBed } from '@angular/core/testing';

import { BookingResponseService } from './booking-response.service';

describe('BookingResponseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingResponseService = TestBed.get(BookingResponseService);
    expect(service).toBeTruthy();
  });
});
