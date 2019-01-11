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
    return this.http.get(`${this.BASE_URL}/booked/day`, { params });
  }


//   addBooking(booking: Booking) {
//     let headers = new Headers({'Content-Type': 'application/json'});
//     let options = new RequestOptions({headers: headers});
//     let url = this.SERVICE_URL + "items/" + booking.item.id + "/bookings";
//     let data = JSON.stringify(
//         {name: booking.name, endTime: booking.endTime, startTime: booking.startTime}
//     );
//     console.log("data: " + data);
//     return this.http.post(url, data, options).map(res => res.json());
// }

  // makeBooking(start, finish, year, month, day): Observable<BookingResponse> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   const data = { 
  //       start: start, 
  //       finish: finish, 
  //       year: year, 
  //       month: month, 
  //       day: day 
  //     };
  //   return this.http.post<BookingResponse>(`${this.BASE_URL}`, data, httpOptions);
  // }

  // get profile pic for about page
  getProfilePic(url): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }


}
