import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:8080/booking';

  constructor(private http: HttpClient) { }

  // get booked times for day
  getDayBookedTimes(date): Observable<any> {
    const params = new HttpParams().set('date', date);
    return this.http.get(`${this.BASE_URL}/day`, { params });
  }

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
