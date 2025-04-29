import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, } from '@angular/router';
import { Seat } from '../../core/model/interface/seat.model';
import { Service1Service } from '../../services/service1.service';

export interface Passenger {
  name: string;
  age: number;
  gender: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  router = inject(Router);
  service1 = inject(Service1Service);
  selectedSeats: Seat[] = [];
  seatArray: Seat[] = Array.from({ length: 24 }, (_, i) => ({
    seat: (i + 1).toString(),
    isBooked: false,
    passenger: null,
    isSelected: false,
  }));

  ticketPrice: number = 1000; // Default ticket price
  offerDiscount: number = 100; // Discount for the offer
  offerActive: boolean = false; // If the offer is active
  discountedPrice: number = this.ticketPrice;

  ngOnInit() {
    const savedSeats = localStorage.getItem('seatArray');
    if (savedSeats) {
      this.seatArray = JSON.parse(savedSeats);
    }
  }

  // Function to select/unselect seats
  selectSeat(seat: Seat) {
    if (!seat.isBooked) {
      const index = this.selectedSeats.findIndex((s) => s.seat === seat.seat);
      if (index === -1) {
        this.selectedSeats.push({
          ...seat,
          passenger: seat.passenger || { name: '', age: '', gender: '' },
        });
      } else {
        this.selectedSeats.splice(index, 1);
      }
    }
  }

  getSeatClass(seat: Seat) {
    if (seat.isBooked) {
      return 'btn-success';
    } else if (this.selectedSeats.some((s) => s.seat === seat.seat)) {
      return 'btn-warning';
    } else {
      return 'btn-primary';
    }
  }

  removeSelectedSeat(seat: Seat) {
    this.selectedSeats = this.selectedSeats.filter((s) => s.seat !== seat.seat);
  }

  submitPassengers() {
    this.selectedSeats.forEach((selectedSeat) => {
      const seatIndex = this.seatArray.findIndex(
        (s) => s.seat === selectedSeat.seat
      );
      if (seatIndex !== -1) {
        this.seatArray[seatIndex] = { ...selectedSeat, isBooked: true };
      }
    });

    localStorage.setItem('seatArray', JSON.stringify(this.seatArray));
    this.selectedSeats = [];
  }

  cancelBooking(seat: Seat) {
    seat.isBooked = false;
    seat.passenger = null;
    localStorage.setItem('seatArray', JSON.stringify(this.seatArray));
  }

  hasBookedSeats(): boolean {
    return this.seatArray.some((seat) => seat.isBooked);
  }

  goToPayment(seat: Seat) {
    if (seat.isBooked && seat.passenger) {
      this.service1.navigateToPayment([seat]);
    }
  }

  payForAll() {
    const bookedSeats = this.seatArray.filter((seat) => seat.isBooked);
    if (bookedSeats.length > 0) {
      localStorage.setItem('selectedSeats', JSON.stringify(bookedSeats));
      localStorage.setItem(
        'totalAmount',
        JSON.stringify(this.totalBookedAmount)
      );

      this.service1.navigateToPayment(bookedSeats);
    } else {
      alert('No booked seats available for payment.');
    }
  }

  // Apply the discount offer
  applyDiscount() {
    this.offerActive = true;
    this.discountedPrice = this.ticketPrice - this.offerDiscount;
  }

  get totalBookedAmount(): number {
    return (
      this.seatArray.filter((seat) => seat.isBooked).length *
      this.discountedPrice
    );
  }
}
