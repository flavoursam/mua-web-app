import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DateTimeComponent } from './components/schedule-booking/date-time/date-time.component';
import { PersonalDetailsComponent } from './components/schedule-booking/personal-details/personal-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'dateTime', component: DateTimeComponent }, // route 1
  { path: 'personalDetails', component: PersonalDetailsComponent }    // route 2
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
