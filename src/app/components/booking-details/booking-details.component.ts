import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingResponseService } from '../../services/booking-response.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  id: string;
  message: string;
  name: string;
  email: string;
  mobile: string;
  date: string;
  time: string;

  constructor(private http: ApiService, 
              private bookingReponseService: BookingResponseService) { }

  ngOnInit() {
    this.bookingReponseService.booking$
      .subscribe((data) => {
        this.id = data.bookingId;
        this.message = data.result;
        this.getInfo(data.bookingId);
      });
  }

  getInfo(id) {
    this.http.getBookingListById(id)
      .subscribe((response) => {
        this.name = response[0].firstName + ' ' + response[0].lastName;
        this.email = response[0].email;
        this.mobile = response[0].mobile;
        this.date = response[0].bookingDate;
        this.time = response[0].start + ' - ' + response[0].finish;
      });
  }




}
