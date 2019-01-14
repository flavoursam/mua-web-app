import { Component, OnInit, Input } from '@angular/core';
import { ScheduleBookingService } from '../../services/schedule-booking.service';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule-booking',
  templateUrl: './schedule-booking.component.html',
  styleUrls: ['./schedule-booking.component.scss'],
})
export class ScheduleBookingComponent implements OnInit {

  private requestData = []; 
  
  constructor(private request: ApiService, private scheduleBookingService: ScheduleBookingService) { }
  
  ngOnInit() { }

  storePersonalDetails() {
    this.requestData.push(this.scheduleBookingService.getPersonalDetails());
  }

  storeDateTime() {
    this.requestData = [];
    this.requestData.push(this.scheduleBookingService.getDateTime());
    console.log('storeDateTime so far:' , this.requestData)
  }

  viewBookingSummary() {
    console.log('requestData: ', this.requestData)
  }

  // sendBookingRequest(requestPayload) {
  //   console.log("requestData: ", this.requestData)
  //   this.request.makeBooking(requestPayload)
  //     .subscribe((data) => {
  //       console.log('data: ' , data)
  //     });
  // }

}
