import { TestBed } from '@angular/core/testing';

import { ScheduleBookingService } from './schedule-booking.service';

describe('ScheduleBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleBookingService = TestBed.get(ScheduleBookingService);
    expect(service).toBeTruthy();
  });
});
