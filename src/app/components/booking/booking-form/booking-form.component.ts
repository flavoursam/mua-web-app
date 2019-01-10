import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingRequest } from '../../../booking-request';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  
  submitted = false;
  model = new BookingRequest;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }
}
