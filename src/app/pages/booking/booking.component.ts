import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  router = inject(Router);
  selectedSeat: any = null;

  // Seat data
  seatArray: any[] = [
    { seat: '1', isBooked: false, passenger: null },
    { seat: '2', isBooked: false, passenger: null },
    { seat: '3', isBooked: false, passenger: null },
    { seat: '4', isBooked: false, passenger: null },
    { seat: '5', isBooked: false, passenger: null },
    { seat: '6', isBooked: false, passenger: null },
    { seat: '7', isBooked: false, passenger: null },
    { seat: '8', isBooked: false, passenger: null },
    { seat: '9', isBooked: false, passenger: null },
    { seat: '10', isBooked: false, passenger: null },
    { seat: '11', isBooked: false, passenger: null },
    { seat: '12', isBooked: false, passenger: null },
    { seat: '13', isBooked: false, passenger: null },
    { seat: '14', isBooked: false, passenger: null },
    { seat: '15', isBooked: false, passenger: null },
    { seat: '16', isBooked: false, passenger: null },
    { seat: '17', isBooked: false, passenger: null },
  ];

  // Passenger form data
  passenger = { name: '', age: '', gender: '', seat: '' };

  ngOnInit() {
    const savedSeats = localStorage.getItem('seatArray');
    console.log('Saved Seats in ngOnInit:', savedSeats); // ✅ Confirm loaded data

    if (savedSeats) {
      this.seatArray = JSON.parse(savedSeats);
    }
  }

  // Handle seat selection
  selectSeat(seat: any) {
    if (!seat.isBooked) {
      this.selectedSeat = seat;
      this.passenger.seat = seat.seat;
    }
  }
  // Submit passenger details
  submitPassenger() {
    if (this.passenger.name && this.passenger.age && this.passenger.gender) {
      this.selectedSeat.isBooked = true;
      this.selectedSeat.passenger = { ...this.passenger };

      console.log('Before Saving:', this.seatArray);  // ✅ Confirm data before saving
      localStorage.setItem('seatArray', JSON.stringify(this.seatArray));

      this.passenger = { name: '', age: '', gender: '', seat: '' };
      this.selectedSeat = null;
    }
  }

  // Go to payment page with selected seat data
  goToPayment(seat: any) {
    if (seat.isBooked && seat.passenger) {
      this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify([seat]) } });
    }
  }

  // Group payment for multiple seats
  groupPayment() {
    const selectedSeats = this.seatArray.filter(seat => seat.isSelected && seat.isBooked);
    if (selectedSeats.length > 0) {
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify(selectedSeats) } });
    } else {
      alert('Please select at least 2 booked seats for payment.');
    }
  }
}
