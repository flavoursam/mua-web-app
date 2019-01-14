import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleBookingData } from '../schedule-booking-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:8080/booking';

  constructor(private http: HttpClient) { }

  // get booked times for day
  getDayBookedTimes(date): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get(`${this.BASE_URL}/booked/day`, { params });
  }

  makeBooking(requestData): Observable<ScheduleBookingData> {
    return this.http.post<ScheduleBookingData>(`${this.BASE_URL}`, requestData);
  }

  // get profile pic for about page
  getProfilePic(url): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }


}
