import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Bus } from '../core/model/interface/bus.model';
import { Seat } from '../core/model/interface/seat.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private apiUrl = 'http://localhost:5000/api/buses'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Method to fetch bus list based on source and destination
  getBusList(from: string, to: string): Observable<Bus[]> {
    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Bus[]>(`${this.apiUrl}/search`, { params });
  }

  saveBookingDetails(
    bookedTickets: Seat[],
    totalAmount: number
  ): Observable<any> {
    const bookingData = { bookedTickets, totalAmount };
    return this.http.post<any>(
      'http://localhost:5000/api/saveBooking',
      bookingData
    );
  }
}
