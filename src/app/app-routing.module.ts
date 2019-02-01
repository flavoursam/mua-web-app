import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ScheduleBookingComponent } from './components/schedule-booking/schedule-booking.component';
import { LoginComponent } from './components/login/login.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'makeBooking', component: ScheduleBookingComponent },
  { path: 'bookingDetails', component: BookingDetailsComponent },

  // else redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
