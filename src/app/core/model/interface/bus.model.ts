export interface Bus {
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

  export interface searchObj{
    fromLocation:string;
    toloction:string;
    travelDate:Date;
  }
 
  