import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Seat } from '../../core/model/interface/seat.model';

@Component({
  selector: 'app-bookdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
})
export class BookdetailsComponent implements OnInit {
  // ✅ Implements OnInit correctly

  bookedTickets: Seat[] = [];

  ngOnInit(): void {
    // ✅ Add this method to fix the error
    const savedSeats = localStorage.getItem('seatArray');
    if (savedSeats) {
      const allSeats = JSON.parse(savedSeats);
      this.bookedTickets = allSeats.filter((seat: Seat) => seat.isBooked);
      console.log('Booked Tickets:', this.bookedTickets);
    }
  }
}
