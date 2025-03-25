import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Seat } from '../core/model/interface/seat.model';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  router=inject(Router)
//   apiURL:string='https://projectapi.gerasim.in/api/BusBooking/';
//   constructor(private http:HttpClient) { }

//   getLocations():Observable <any[]>{
//     return this.http.get<any[]>(this.apiURL+"GetBusLocations")
//   }
//   searchBus(from:number,to:number,travelDate:string):Observable <any[]>{
//     return this.http.get<any[]>(`${this.apiURL}searchBus?fromLoction=${from}&toLoction=${to}&travelDate=${travelDate}`)
//   }
//   getScehuleById(id:number){
//   return this.http.get<any[]>(this.apiURL+"getBusScheduleById?id=6"+id)
// }
//   onRegisterUser(obj:any){
//     return this.http.post<any[]>(this.apiURL+"AddNewUser",obj)
// }

// goToPayment(seat: Seat) {
//     if (seat.isBooked && seat.passenger) {
//       this.router.navigate(['/payment'], { queryParams: { seats: JSON.stringify([seat]) } });
//     }
//   }

}
