import { Component, OnInit, Input } from '@angular/core';
import { ScheduleBookingService } from '../../services/schedule-booking.service';
import { ApiService } from '../../services/api.service';
import { ScheduleBookingResponse } from 'src/app/schedule-booking-response';

@Component({
  selector: 'app-schedule-booking',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.scss'],
})
export class ScheduleBookingComponent implements OnInit {

  requestData = []; 
  submitted = false;
  response = new ScheduleBookingResponse();
  
  constructor(private request: ApiService, private scheduleBookingService: ScheduleBookingService) { }
  
  ngOnInit() { }

  storePersonalDetails() {
    if (this.requestData.length === 0) {
      this.requestData.push(this.scheduleBookingService.getPersonalDetails());
    } else {
      this.requestData.splice(1, 1, this.scheduleBookingService.getPersonalDetails());
    }
  }

  storeDateTime() {
    if (this.requestData.length === 0) {
      this.requestData.push(this.scheduleBookingService.getDateTime());
    } else {
      this.requestData.splice(0, 1, this.scheduleBookingService.getDateTime());
    }
  }

  submitBookingRequest() {    // TODO: validate booking details before sending booking request
    this.scheduleBookingRequest();
  }

  scheduleBookingRequest() {
    this.request.makeBooking(this.requestData)
      .subscribe((data) => {
        this.submitted = true;
        this.response.result = data.result;
        this.response.id = data.bookingId;
      });
  }

}
