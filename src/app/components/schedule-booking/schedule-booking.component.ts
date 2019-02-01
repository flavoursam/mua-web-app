import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleBookingService } from '../../services/schedule-booking.service';
import { ApiService } from '../../services/api.service';
import { BookingResponseService } from 'src/app/services/booking-response.service';

@Component({
  selector: 'app-schedule-booking',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.scss'],
})
export class ScheduleBookingComponent implements OnInit {

  data = [];

  constructor(private http: ApiService, 
              private scheduleBookingService: ScheduleBookingService,
              private bookingResponseService: BookingResponseService,
              private router: Router
              ) { }

  ngOnInit() { }

  storePersonalDetails() {
    if (this.data.length === 0) {
      this.data.push(this.scheduleBookingService.getPersonalDetails());
    } else {
      this.data.splice(1, 1, this.scheduleBookingService.getPersonalDetails());
    }
  }

  storeDateTime() {
    if (this.data.length === 0) {
      this.data.push(this.scheduleBookingService.getDateTime());
    } else {
      this.data.splice(0, 1, this.scheduleBookingService.getDateTime());
    }
  }

  submitBookingRequest() {    // TODO: validate booking details before sending booking request
    this.http.makeBooking(this.data)
      .subscribe((response) => {
        this.bookingResponseService.sendMessage(response);
      });
      this.router.navigate(['/bookingDetails']);
  }



}
