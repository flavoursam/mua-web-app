import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:8080/booking';

  constructor(private http: HttpClient) { }

  // get booked times by day
  getDayBookedTimes(date): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get(`${this.BASE_URL}/date`, { params });
  }

  // get booking details by Id
  getBookingListById(id): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${this.BASE_URL}/id`, { params });
  }

  // get list of bookings by email
  getBookingListByEmail(email): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(`${this.BASE_URL}/email`, { params });
    
  }

  // schedule booking request
  makeBooking(requestData): Observable<any> {
    const data = requestData[1];
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append('start', requestData[0].start);
    params = params.append('finish', requestData[0].finish);
    params = params.append('year', requestData[0].year);
    params = params.append('month', requestData[0].month);
    params = params.append('day', requestData[0].day);

    return this.http.post<any>(this.BASE_URL, data, { headers: headers, params: params });
  }


  
  // get profile pic for about page
  getProfilePic(url): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }


}
