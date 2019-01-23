import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { __ } from 'lodash';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from '../../models/schedule-booking-data.model';
import { AvailableTimes } from '../../models/available-times.model';

import { ScheduleBookingService } from '../../services/schedule-booking.service';
import { ApiService } from 'src/app/services/api.service';
import { MapType } from '@angular/compiler';


@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss']
})
export class DateTimeComponent implements OnInit {

  dp: NgbDateStruct;
  unavailableTimes = [];
  availableTimes = [];
  allTimes = new AvailableTimes();

  @Output() dateTimeValues = new EventEmitter<DateTime>();

  constructor(private scheduleBookingService: ScheduleBookingService,
    private calendar: NgbCalendar,
    private http: ApiService) { }

  ngOnInit() {
    this.dp = this.calendar.getToday();
    const today = this.dateFormatter(this.dp.year, this.dp.month, this.dp.day);
    this.fetchDayBookedTimes(today);
  }

  onChange(value) {
    const currentDay = this.dateFormatter(value.year, value.month, value.day);
    this.fetchDayBookedTimes(currentDay);
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

  overlap(bookedStart, bookedFinish, availStart, availFinish) {
    if (bookedStart <= availStart && availStart < bookedFinish) {
      return true;
    }
    if (bookedStart < availFinish && availFinish <= bookedFinish) {
      return true;
    }
    if (availStart < bookedStart && bookedFinish < availFinish) {
      return true;
    }
    return false;
  }

  check() {
    this.sortTimes(this.unavailableTimes);
    console.log(this.unavailableTimes);

    const overlaps = [];
    let i, j;
    for (i = 0; i < this.unavailableTimes.length; i++) {
      for (j = 0; j < this.allTimes.times.length; j++) {
        const unavailTime = this.unavailableTimes[i];
        const availTime = this.allTimes.times[j];
        if (this.overlap(unavailTime.start, unavailTime.finish, availTime.start, availTime.finish)) {
          overlaps.push({ start: availTime.start, finish: availTime.finish });
        }
      }
    }
      
    const onlyInA = overlaps.filter(this.difference(this.allTimes.times));
    const onlyInB = this.allTimes.times.filter(this.difference(overlaps));
    
    this.availableTimes = onlyInA.concat(onlyInB);
    
    console.log('Available booking times: ', this.availableTimes);
    return this.availableTimes;

  }

  selectTime(time) {
    const dateTime = {
      year: this.dp.year,
      month: this.dp.month,
      day: this.dp.day,
      start: time,
      finish: time + 1
    };
    this.scheduleBookingService.setDateTime(dateTime);
  }

  sendDateTime() {
    this.dateTimeValues.emit(this.scheduleBookingService.getDateTime());
  }

  difference(otherArray) {
    return function(current) {
      return otherArray.filter(function(other) {
        return other.start === current.start && other.finish === current.finish;
      }).length === 0;
    };
  }


  sortTimes(arr) {
    return arr.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));
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
