import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Seat } from '../../core/model/interface/seat.model';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-bookdetails',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
})
export class BookdetailsComponent implements OnInit {
  // ✅ Implements OnInit correctly
  http = inject(HttpClient);
  master = inject(MasterService);
  totalAmount: number = 0;

  bookedTickets: Seat[] = [];

  ngOnInit(): void {
    //add payment amount
    const totalAmount = localStorage.getItem('totalAmount');
    if (totalAmount) {
      this.totalAmount = JSON.parse(totalAmount);
    }
    // ✅ Add this method to fix the error
    const savedSeats = localStorage.getItem('seatArray');
    if (savedSeats) {
      const allSeats = JSON.parse(savedSeats);
      this.bookedTickets = allSeats.filter((seat: Seat) => seat.isBooked);
      console.log('Booked Tickets:', this.bookedTickets);
    }
  }
  downloadBookedTickets() {
    let content = 'booked ticketes';

    this.bookedTickets.forEach((ticket) => {
      content += `seat no:${ticket.seat}\n`;
      content += `Name:${ticket.passenger?.name}\n`;
      content += `Age:${ticket.passenger?.age}\n`;
      content += `Gender:${ticket.passenger?.gender}\n`;
    }, (content += `Price:${this.totalAmount}\n`));
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Booked-Tickets.txt');

    this.master
      .saveBookingDetails(this.bookedTickets, this.totalAmount)
      .subscribe({
        next: (response) => {
          console.log('Booking details saved to database:', response);
        },
        error: (error) => {
          console.error('Error saving booking details:', error);
        },
      });
  }
}
