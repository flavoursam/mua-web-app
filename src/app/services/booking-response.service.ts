import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class BookingResponseService {

  private scheduleBookingSource = new ReplaySubject<any>();
  booking$ = this.scheduleBookingSource.asObservable();

  constructor(private http: ApiService) { }

  sendMessage(response: Object) {
    this.scheduleBookingSource.next(response);
  }


}
