import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carso',
  standalone: true,
  imports: [],
  templateUrl: './carso.component.html',
  styleUrl: './carso.component.css'
})
export class CarsoComponent {
  
  constructor(private Toast:ToastrService){
  }
  
  save(){
    this.Toast.error("error","this is error",{closeButton:true,positionClass:'toast-top-left',timeOut:500})
  }
}
