import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  private _pickerModel: NgbDate;
  allTimes = [];

  myForm: FormGroup;

  onSubmit(form: any): void {  
    console.log('you submitted value:', form);  
  }

  constructor(private api: ApiService, private calender: NgbCalendar, fb: FormBuilder) {
    this.myForm = fb.group({  
      'firstName': ['Tracey']  
    });  
  }
  


  ngOnInit() { 
    this.selectToday();
    this.viewSlots();
  }

  selectToday() {
    this.pickerModel = this.calender.getToday();
  }

  sendBookingRequest(start, finish) {
    const year = this.yearHelper();
    const month = this.monthHelper();
    const day = this.dayHelper();

    this.api.makeBooking(start, finish, year, month, day)
      .subscribe((data) => {
        console.log('data: ' + data)
      });

    
  }

  viewSlots() {
    this.allTimes = [
      { start: 9, finish: 10 },
      { start: 10, finish: 11 },
      { start: 11, finish: 12 },
      { start: 12, finish: 13 },
      { start: 13, finish: 14 },
      { start: 14, finish: 15 },
      { start: 15, finish: 16 },
      { start: 16, finish: 17 },
    ];
  }
  
  set pickerModel(val) {
    this._pickerModel = val;
  }

  get pickerModel() {
    return this._pickerModel;
  }

  // getAvailability() {
  //   this.api.getDayBookedTimes()
  //     .subscribe(bt =>  {
  //       this.bookedTimes = bt;
  //     });   
  // }

  yearHelper() {
    const yyyy = '' + this._pickerModel.year;
    return yyyy;
  }

  dayHelper() {
    let dd;
    if (this._pickerModel.day < 10) {
      dd = '0' + this._pickerModel.day;
    } else {
      dd = '' + this._pickerModel.day;
    }
    return dd;
  }

  monthHelper() {
    let mm;
    if (this._pickerModel.month < 10) {
      mm = '0' + this._pickerModel.month;
    } else {
      mm = '' + this._pickerModel.month;
    } 
    return mm;
  }

}
