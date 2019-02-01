import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ScheduleBookingService } from '../../services/schedule-booking.service';
import { ApiService } from 'src/app/services/api.service';
import { PersonalDetails } from 'src/app/models/schedule-booking-data.model';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  personalDetails = new PersonalDetails();

  @Output() personalDetailsValues = new EventEmitter<PersonalDetails>();

  constructor(private scheduleBookingService: ScheduleBookingService) { }

  ngOnInit() {
  }

  selectPersonalDetails() {
    this.scheduleBookingService.setPersonalDetails(this.personalDetails);
    this.personalDetailsValues.emit(this.scheduleBookingService.getPersonalDetails());
    console.log(this.scheduleBookingService.getPersonalDetails())
  }
  
}
