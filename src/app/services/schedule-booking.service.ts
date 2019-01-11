import { Injectable } from '@angular/core';
import { ScheduleBookingData, DateTime, PersonalDetails } from '../schedule-booking-data.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleBookingService {

  private scheduleBookingData: ScheduleBookingData = new ScheduleBookingData();

  private isDateTimeValid = false;
  private isPersonalDetailsValid = false;

  getDateTime(): DateTime {
    const timeSlot = 13;    // TO DO: handle time slot 

    const dateTime: DateTime = {
      year: this.scheduleBookingData.year,
      month: this.scheduleBookingData.month,
      day: this.scheduleBookingData.day,
      timeSlot: timeSlot,   
    };

    return dateTime;
  }
  
  setDateTime(dateTime: DateTime) {
    this.isDateTimeValid = true;
    this.scheduleBookingData.year = dateTime.year;
    this.scheduleBookingData.month = dateTime.month;
    this.scheduleBookingData.day = dateTime.day;
    this.scheduleBookingData.timeSlot = dateTime.timeSlot;
  }

  constructor() { }


}
