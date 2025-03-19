import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiURL:string='https://projectapi.gerasim.in/api/BusBooking/';
  constructor(private http:HttpClient) { }

  getLocations():Observable <any[]>{
    return this.http.get<any[]>(this.apiURL+"GetBusLocations")
  }
  searchBus(from:number,to:number,travelDate:string):Observable <any[]>{
    return this.http.get<any[]>(`${this.apiURL}searchBus?fromLoction=${from}&toLoction=${to}&travelDate=${travelDate}`)
  }
  getScehuleById(id:number){
  return this.http.get<any[]>(this.apiURL+"getBusScheduleById?id=6"+id)
}
  onRegisterUser(obj:any){
    return this.http.post<any[]>(this.apiURL+"AddNewUser",obj)
}
}
