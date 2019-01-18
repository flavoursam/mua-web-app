import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ScheduleBookingService } from '../../../services/schedule-booking.service';
import { DateTime } from '../../../schedule-booking-data.model';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

  private datePicker: NgbDateStruct;
  private timeSlots = [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ]; // TO DO: time slot view
  private dateTimeValid = false;
  private time;

  @Output() dateTimeValues = new EventEmitter<DateTime>();

  constructor(private scheduleBookingService: ScheduleBookingService, private calendar: NgbCalendar) { }

  ngOnInit() {
    this.datePicker = this.calendar.getToday();
    this.selectDateOnLoad(this.datePicker.day);
  }

  selectDateOnLoad(day) {
    const date = {
      year: this.datePicker.year,
      month: this.datePicker.month,
      day: this.datePicker.day,
      start: null,
      finish: null
    };
    this.scheduleBookingService.setDateTime(date);
  }

  selectTime(time) {
    const dateTime = {
      year: this.datePicker.year,
      month: this.datePicker.month,
      day: this.datePicker.day,
      start: time,
      finish: time + 1
    };
    this.scheduleBookingService.setDateTime(dateTime);
    this.time = time;
    this.isDateTimeValid();
  }

  isDateTimeValid() {
    // TO DO: validate selected date and time 
    return this.dateTimeValid = true;
  }

  sendDateTime() {
    this.dateTimeValues.emit(this.scheduleBookingService.getDateTime());
  }

}
