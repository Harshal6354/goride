import { inject, Injectable } from '@angular/core';
import { Seat } from '../core/model/interface/seat.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {
 router =inject(Router)
  constructor() { }
  loadData(){

  }
  navigateToPayment(seats: Seat[]) {
    if (seats.length > 0) {
      this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify(seats) } });
    }
  }
  

}
