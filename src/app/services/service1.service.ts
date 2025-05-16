import { inject, Injectable } from '@angular/core';
import { Seat } from '../core/model/interface/seat.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Service1Service {
  router = inject(Router);

  //constrctor
  private seatArray: Seat[] = Array.from({ length: 21 }, (_, i) => ({
    seat: (i + 1).toString(),
    isBooked: false,
    passenger: null,
    isSelected: false,
  }));

  selectedSeats: Seat[] = []; // Stores currently selected seats for booking
  constructor() {
    const savedSeats = localStorage.getItem('seatArray');
    if (savedSeats) {
      this.seatArray = JSON.parse(savedSeats);
    }
  }
  //select seat code
  selectSeat(seat: Seat): void {
    if (!seat.isBooked) {
      const index = this.selectedSeats.findIndex((s) => s.seat === seat.seat);

      if (index === -1) {
        // Ensure passenger is always initialized
        this.selectedSeats.push({
          ...seat,
          passenger: seat.passenger || { name:'', age: '', gender: '' },
        });
      } else {
        this.selectedSeats.splice(index, 1);
      }
    }
  }

  getSeats(): Seat[] {
    return this.seatArray;
  }

  getSelectedSeats(): Seat[] {
    return this.selectedSeats;
  }
  navigateToPayment(seats: Seat[]) {
    if (seats.length > 0) {
      this.router.navigate(['/payment'], {
        queryParams: { seats: JSON.stringify(seats) },
      });
    }
  }

  getAuthtoken(): string {
    return '12223233';
  }
}
