import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Seat } from '../../core/model/interface/seat.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  router = inject(Router);
  selectedSeats: Seat[] = []; // Stores currently selected seats for booking

  // Seat data - default values
  seatArray: Seat[] = Array.from({ length: 21 }, (_, i) => ({
    seat: (i + 1).toString(),
    isBooked: false,
    passenger: null,
    isSelected: false
  }));

  ngOnInit() {
    // Load saved seat data from local storage if available
    const savedSeats = localStorage.getItem('seatArray');
    if (savedSeats) {
      this.seatArray = JSON.parse(savedSeats);
    }
  }

  // Function to select/unselect seats
  selectSeat(seat: Seat) {
    if (!seat.isBooked) {
      const index = this.selectedSeats.findIndex(s => s.seat === seat.seat);
  
      if (index === -1) {
        // Ensure passenger is always initialized
        this.selectedSeats.push({ 
          ...seat, 
          passenger: seat.passenger || { name: '', age: '', gender: '' } 
        });
      } else {
        this.selectedSeats.splice(index, 1);
      }
    }
  }
  

  // Function to dynamically assign seat colors based on status
  getSeatClass(seat: Seat) {
    if (seat.isBooked) {
      return 'btn-success';  // Green for booked seats
    } else if (this.selectedSeats.some(s => s.seat === seat.seat)) {
      return 'btn-warning';  // Yellow for selected seats
    } else {
      return 'btn-primary';   // Blue for available seats
    }
  }

  // Remove a selected seat before confirming booking
  removeSelectedSeat(seat: Seat) {
    this.selectedSeats = this.selectedSeats.filter(s => s.seat !== seat.seat);
  }

  // Submit selected seats and store booking details
  submitPassengers() {
    this.selectedSeats.forEach(selectedSeat => {
      const seatIndex = this.seatArray.findIndex(s => s.seat === selectedSeat.seat);
      if (seatIndex !== -1) {
        this.seatArray[seatIndex] = { ...selectedSeat, isBooked: true }; // Mark as booked
      }
    });

    localStorage.setItem('seatArray', JSON.stringify(this.seatArray));
    this.selectedSeats = []; // Clear selected seats after booking
  }

  // Cancel a booked seat
  cancelBooking(seat: Seat) {
    seat.isBooked = false;
    seat.passenger = null;
    localStorage.setItem('seatArray', JSON.stringify(this.seatArray));
  }


  hasBookedSeats(): boolean {
    return this.seatArray.some(seat => seat.isBooked);
  }

  // Navigate to payment page for a single seat
  goToPayment(seat: Seat) {
    if (seat.isBooked && seat.passenger) {
      this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify([seat]) } });
    }
  }

  // Navigate to payment page for all booked seats
  payForAll() {
    const bookedSeats = this.seatArray.filter(seat => seat.isBooked);
    if (bookedSeats.length > 0) {
      localStorage.setItem('selectedSeats', JSON.stringify(bookedSeats));
      this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify(bookedSeats) } });
    } else {
      alert('No booked seats available for payment.');
    }
  }
}
