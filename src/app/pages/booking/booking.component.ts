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
  selectedSeats: any[] = [];

  seatArray: any[] = [
    { seat: '1', isBooked: false, passenger: null, isSelected: false },
    { seat: '2', isBooked: false, passenger: null, isSelected: false },
    { seat: '3', isBooked: false, passenger: null, isSelected: false },
    { seat: '4', isBooked: false, passenger: null, isSelected: false },
    { seat: '5', isBooked: false, passenger: null, isSelected: false },
    { seat: '6', isBooked: false, passenger: null, isSelected: false },
    { seat: '7', isBooked: false, passenger: null, isSelected: false },
    { seat: '8', isBooked: false, passenger: null, isSelected: false },
    { seat: '9', isBooked: false, passenger: null, isSelected: false },
    { seat: '10', isBooked: false, passenger: null, isSelected: false },
    { seat: '11', isBooked: false, passenger: null, isSelected: false },
    { seat: '12', isBooked: false, passenger: null, isSelected: false },
    { seat: '13', isBooked: false, passenger: null, isSelected: false },
    { seat: '14', isBooked: false, passenger: null, isSelected: false },
    { seat: '15', isBooked: false, passenger: null, isSelected: false },
    { seat: '16', isBooked: false, passenger: null, isSelected: false },
    { seat: '17', isBooked: false, passenger: null, isSelected: false },
    { seat: '18', isBooked: false, passenger: null, isSelected: false },
    { seat: '19', isBooked: false, passenger: null, isSelected: false },
    { seat: '20', isBooked: false, passenger: null, isSelected: false },
    { seat: '21', isBooked: false, passenger: null, isSelected: false },
  ];

  ngOnInit() {
    const savedSeats = localStorage.getItem('seatArray');
    if (savedSeats) {
      this.seatArray = JSON.parse(savedSeats);
    }
  }
  seatcolor:string="yellow"

  // Select multiple seats
  selectSeat(seat: any) {
    if (!seat.isBooked) {
      const index = this.selectedSeats.findIndex(s => s.seat === seat.seat);
  
      if (index === -1) {
        // Add to selectedSeats if not already selected
        this.selectedSeats.push({ ...seat, passenger: { name: '', age: '', gender: '' } });
      } else {
        // Remove from selectedSeats if clicked again
        this.selectedSeats.splice(index, 1);
      }
    }
  }
  // Function to get the seat's class dynamically
  getSeatClass(seat: any) {
    if (seat.isBooked) {
      return 'btn-success'; 
    } else if (this.selectedSeats.some(s => s.seat === seat.seat)) {
      return 'btn-warning';  
    } else {
      return 'btn-primary';   
    }
  }
  // Remove selected seat before booking
  removeSelectedSeat(seat: any) {
    this.selectedSeats = this.selectedSeats.filter(s => s.seat !== seat.seat);
  }

  // Submit multiple passengers
  submitPassengers() {
    this.selectedSeats.forEach(selectedSeat => {
      const seatIndex = this.seatArray.findIndex(s => s.seat === selectedSeat.seat);
      if (seatIndex !== -1) {
        this.seatArray[seatIndex] = { ...selectedSeat, isBooked: true }; // Mark as booked
      }
    });
  
    localStorage.setItem('seatArray', JSON.stringify(this.seatArray));
    this.selectedSeats = []; // Clear selectedSeats after booking
  }
  
  // Cancel a booked seat
  cancelBooking(seat: any) {
    seat.isBooked = false;
    seat.passenger = null;
    localStorage.setItem('seatArray', JSON.stringify(this.seatArray));
  }
 

  hasBookedSeats(): boolean {
    return this.seatArray.some(seat => seat.isBooked);
  }
  // Go to payment page with selected seat data
  goToPayment(seat: any) {
    if (seat.isBooked && seat.passenger) {
      this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify([seat]) } });
    }
  }
  // Group payment for multiple seats
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
