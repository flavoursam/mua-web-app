import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from '../../models/schedule-booking-data.model';
import { AvailableTimes } from '../../models/available-times.model';

import { ScheduleBookingService } from '../../services/schedule-booking.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

  dp: NgbDateStruct;
  selectedDate: string;
  today: string;
  unavailableTimes = [];  // booked times
  availableTimes = [];    // available for bookings times
  allTimes = new AvailableTimes();  // all possible times
  uiTimes = new Map();              // available times formatted for UI
  
  @Output() dateTimeValues = new EventEmitter<DateTime>();

  constructor(private scheduleBookingService: ScheduleBookingService,
              private calendar: NgbCalendar,
              private http: ApiService) { }

  ngOnInit() {
    this.dp = this.calendar.getToday();
    this.today = this.dateFormatter(this.dp.year, this.dp.month, this.dp.day);
    this.fetchDayBookedTimes(this.today);
  }

  onChange(value) {
    this.selectedDate = this.dateFormatter(value.year, value.month, value.day);
    this.fetchDayBookedTimes(this.selectedDate);
  }

  fetchDayBookedTimes(date) {
    this.http.getDayBookedTimes(date)
      .subscribe((bookedTimes) => {      
        let times = {};
        if (this.unavailableTimes.length !== 0) {
          this.unavailableTimes = [];
        }
        bookedTimes.forEach((time) => {
          times = {
            start: time.start,
            finish: time.finish
          };
          this.unavailableTimes.push(times);
        });
      });
  }

  check() {
    this.uiTimes.clear(); // TO DO:
    const overlaps = [];
    this.unavailableTimes.forEach(x => {
      this.allTimes.times.forEach(y => {
        if (this.overlap(x.start, x.finish, y.start, y.finish)) {
          overlaps.push({ start: y.start, finish: y.finish });
        }
      });
    });

    const onlyInA = overlaps.filter(this.difference(this.allTimes.times));
    const onlyInB = this.allTimes.times.filter(this.difference(overlaps));
    // console.log('Available booking times: ', onlyInA.concat(onlyInB));
    this.availableTimes = onlyInA.concat(onlyInB);
    this.availableToViewMapping();

    return this.availableTimes; 
  }
  
  selectTime(time) {
    let year, month, day;
    if (this.selectedDate !== this.today) {
      year = this.selectedDate.substring(0, 4);
      month = this.selectedDate.substring(4, 6);
      day = this.selectedDate.substring(6, 8);
    } else {
      // to do
    }
    const dateTime = {
      year: year,
      month: month,
      day: day,
      start: time.key,
      finish: time.key + 2 
    };
    this.scheduleBookingService.setDateTime(dateTime);
    //  emit date and time to schedule booking component
    this.dateTimeValues.emit(this.scheduleBookingService.getDateTime());
  }


  availableToViewMapping() {
    this.availableTimes.forEach((item) => {
      let start;
      if ((item.start < 12) && ((Number(item.start) === item.start) && (item.start % 1 === 0))) {
        start = item.start + ':00 am';
      } else if ((item.start < 12) && ((Number(item.start) === item.start) && (item.start % 1 !== 0))) {
        start = Math.floor(item.start) + ':30 am';
      } else if ((item.start >= 13) && ((Number(item.start) === item.start) && (item.start % 1 === 0))) {
        start = item.start - 12 + ':00 pm';
      } else if ((item.start >= 13) && ((Number(item.start) === item.start) && (item.start % 1 !== 0))) {
        start = Math.floor(item.start - 12) + ':30 pm';        
      } else if (item.start === 12.5) {       // edge cases 12 and 12:30
        start = Math.floor(item.start) + ':30 pm';
      } else {
        start = item.start + ':00 pm';
      }
      this.uiTimes.set(item.start, start);
    });
    console.log('uiTimes: ' , this.uiTimes);
  }

  overlap(bookedStart, bookedFinish, availStart, availFinish) {
    if ((bookedStart <= availStart) && (availStart < bookedFinish)) {
      return true;
    }
    if ((bookedStart < availFinish) && (availFinish <= bookedFinish)) {
      return true;
    }
    if ((availStart < bookedStart) && (bookedFinish < availFinish)) {
      return true;
    }
    return false;
  }

  difference(otherArray) {
    return function(current) {
      return otherArray.filter(function(other) {
        return other.start === current.start && other.finish === current.finish;
      }).length === 0;
    };
  }

  dateFormatter(year, month, day) {
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return '' + year + month + day;
  }

}
