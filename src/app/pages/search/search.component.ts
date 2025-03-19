import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
interface Bus {
  scheduleID: number;
  busName: string;
  fromLocation: string;
  toLocation: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  rating: number;
  availableSeat: number;
  totalSeats: number;
}
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  router=inject(Router)
  loctions$: Observable<any> = new Observable<any[]>;
  busList: any[] = [
    {
      "price": 1000,
      "totalSeats": 35,
      "availableSeat": 22,
      "arrivalTime": "2025-02-21 T07:00:10",
      "scheduleID": 5,
      "departureTime": "2025-02-21T17:00:04",
      "busName": "Raj-ahme",
      "fromLocation": "Rajkot",
      "toLocation": "ahmedabad",
      "rating": 4.0
    },
    {
      "price": 900,
      "totalSeats": 30,
      "availableSeat": 3,
      "arrivalTime": "2025-02-21 T07:00:10",
      "scheduleID": 3,
      "departureTime": "2025-02-21 T17:00:04",
      "busName": "super-Mumbai",
      "fromLocation": "Mumbai",
      "toLocation": "Narol",
      "rating": 4.5
    },
    {
      "price": 800,
      "totalSeats": 10,
      "availableSeat": 3,
      "arrivalTime": "2025-02-21 T07:00:10",
      "scheduleID": 3,
      "departureTime": "2025-02-21T17:00:04",
      "busName": "star-pune",
      "fromLocation": "pune",
      "toLocation": "vadodara",
      "rating": 3.5
    },
    {
      "price": 1200,
      "totalSeats": 30,
      "availableSeat": 15,
      "arrivalTime": "2025-02-21 T08:00:10",
      "scheduleID": 4,
      "departureTime": "2025-02-21 T18:00:04",
      "busName": "Nagpur",
      "fromLocation": "Himalaya",
      "toLocation": "Delhi",
      "rating": 4.9
    },
    {
      "price": 1200,
      "totalSeats": 30,
      "availableSeat": 15,
      "arrivalTime": "2025-02-21 T08:00:10",
      "scheduleID": 4,
      "departureTime": "2025-02-21 T18:00:04",
      "busName": "Ahmedabad",
      "fromLocation": "Ahmedabad",
      "toLocation": "Gandhinagar",
      "rating": 3.5
    },
    {
      "price": 1200,
      "totalSeats": 30,
      "availableSeat": 15,
      "arrivalTime": "2025-02-21 T08:00:10",
      "scheduleID": 4,
      "departureTime": "2025-02-21 T18:00:04",
      "busName": "Surat",
      "fromLocation": "Surat",
      "toLocation": "Chennai",
      "rating": 3.2
    },
    {
      "price": 1200,
      "totalSeats": 30,
      "availableSeat": 15,
      "arrivalTime": "2025-02-21 T08:00:10",
      "scheduleID": 4,
      "departureTime": "2025-02-21 T18:00:04",
      "busName": "Gandhinagar",
      "fromLocation": "Katch",
      "toLocation": "Gandhinagar",
      "rating": 3.9
    },
    {
      "price": 1000,
      "totalSeats": 40,
      "availableSeat": 20,
      "arrivalTime": "2025-02-21T07:00:10",
      "scheduleID": 6,
      "departureTime": "2025-02-21T17:00:04",
      "busName": "Solapur",
      "fromLocation": "Delhi",
      "toLocation": "Solapur",
      "rating": 4.8
    },
    {
      "price": 1000,
      "totalSeats": 35,
      "availableSeat": 22,
      "arrivalTime": "2025-02-21T07:00:10",
      "scheduleID": 5,
      "departureTime": "2025-02-21T17:00:04",
      "busName": "Raj-ahme 2.0",
      "fromLocation": "Rajkot",
      "toLocation": "ahmedabad",
      "rating": 4.0
    },
  ]
  newbusList: any[] = [];

  searchObj: any = {
    fromLocation: '',
    toLocation: '',
    travelDate: ''
  };
  
  onSearch() {
    const { fromLocation, toLocation } = this.searchObj;
    console.log('From:', fromLocation, 'To:', toLocation); // Debugging line
    if (!fromLocation || !toLocation) {
      return;
    }
    this.newbusList = this.busList.filter(item =>
      item.fromLocation.toLowerCase() === fromLocation.toLowerCase() &&
      item.toLocation.toLowerCase() === toLocation.toLowerCase()
    );

    console.log('Filtered Bus List:', this.newbusList); // Debugging line
  }
  goToBooking2(busList:any) {
    
    this.router.navigate(['/booking'], { queryParams: { 
      totalSeats: busList.totalSeats, 
      availableSeats: busList.availableSeat 
    }});
  }
  

}
