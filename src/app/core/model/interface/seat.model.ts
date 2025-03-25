export interface Seat{
    seat:string;
    isBooked:boolean;
    passenger:{ name: string; age: string; gender: string  } | null;
    isSelected: boolean;

}