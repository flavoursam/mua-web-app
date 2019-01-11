import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PersonalDetails } from 'src/app/schedule-booking-data.model';
import { ScheduleBookingService } from '../../../services/schedule-booking.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  personalDetails: PersonalDetails;
  form: any;
  isDisplayed = false;

  constructor(private router: Router, private scheduleBookingService: ScheduleBookingService) { }

  ngOnInit() {
    this.personalDetails = this.scheduleBookingService.getPersonalDetails();
    console.log('onInit getPersonalDetails() loaded!');
  }

  renderForm() {

  }

  renderPersonalDetailsForm() {
    this.isDisplayed = true;
    this.renderForm();
  }

}
