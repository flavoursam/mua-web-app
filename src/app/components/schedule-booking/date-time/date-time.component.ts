import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ScheduleBookingService } from '../../../services/schedule-booking.service';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

  datePicker: NgbDateStruct;
  timeSlots = [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ];
  slot: number;

  @Output() 
  nextEvent = new EventEmitter();

  constructor(private scheduleBookingService: ScheduleBookingService, private calendar: NgbCalendar) { }

  ngOnInit() {
    this.datePicker = this.calendar.getToday();
  }

  getTimeSlot() {
    return this.slot = this.scheduleBookingService.getDateTime().timeSlot;
  }

  selectTime(slot) {
    const dateTime = {
      year: this.datePicker.year,
      month: this.datePicker.month,
      day: this.datePicker.day,
      timeSlot: slot
    };
    this.scheduleBookingService.setDateTime(dateTime);
    this.getTimeSlot();
    console.log('dateTime:' , dateTime);
  }

  next() {
    this.nextEvent.emit();
  }

}
