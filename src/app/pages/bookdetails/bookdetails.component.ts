import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookdetails',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
 
})
export class BookdetailsComponent implements OnInit {  // ✅ Implements OnInit correctly

  bookedTickets: any[] = [];

  ngOnInit(): void {  // ✅ Add this method to fix the error
    const savedSeats = localStorage.getItem('seatArray');
    if (savedSeats) {
      const allSeats = JSON.parse(savedSeats);
      this.bookedTickets = allSeats.filter((seat: any) => seat.isBooked);
      console.log('Booked Tickets:', this.bookedTickets); 
    }
  }
}
