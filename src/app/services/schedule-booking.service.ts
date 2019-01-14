import { Injectable } from '@angular/core';
import { ScheduleBookingData, DateTime, PersonalDetails } from '../schedule-booking-data.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleBookingService {

  private scheduleBookingData: ScheduleBookingData = new ScheduleBookingData();

  private isDateTimeValid = false;
  private isPersonalDetailsValid = false;

  getPersonalDetails(): PersonalDetails {
    const personalDetails: PersonalDetails = {
      firstName: this.scheduleBookingData.firstName,
      lastName: this.scheduleBookingData.lastName,
      mobile: this.scheduleBookingData.mobile,
      email: this.scheduleBookingData.email,
    };
    
    return personalDetails;
  }

  setPersonalDetails(personalDetails: PersonalDetails) {
    this.isPersonalDetailsValid = true;
    this.scheduleBookingData.firstName = personalDetails.firstName;
    this.scheduleBookingData.lastName = personalDetails.lastName;
    this.scheduleBookingData.mobile = personalDetails.mobile;
    this.scheduleBookingData.email = personalDetails.email;
  }

  getDateTime(): DateTime {
    const dateTime: DateTime = {
      year: this.scheduleBookingData.year,
      month: this.scheduleBookingData.month,
      day: this.scheduleBookingData.day,
      start: this.scheduleBookingData.start,   
      finish: this.scheduleBookingData.finish,   
    };

    return dateTime;
  }
  
  setDateTime(dateTime: DateTime) {
    this.isDateTimeValid = true;
    this.scheduleBookingData.year = dateTime.year;
    this.scheduleBookingData.month = dateTime.month;
    this.scheduleBookingData.day = dateTime.day;
    this.scheduleBookingData.start = dateTime.start;
    this.scheduleBookingData.finish = dateTime.finish;

  }

  constructor() { }


}
