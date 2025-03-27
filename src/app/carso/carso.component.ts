import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface Iuser {
  userId: string;
  id: number;
  title: string;
}
@Component({
  selector: 'app-carso',
  standalone: true,
  imports: [],
  templateUrl: './carso.component.html',
  styleUrl: './carso.component.css',
})
export class CarsoComponent {
  constructor(private Toast: ToastrService) {}
  http = inject(HttpClient);

  save() {
    this.Toast.error('error', 'this is error', {
      closeButton: true,
      positionClass: 'toast-top-left',
      timeOut: 500,
    });
  }

  respons: Iuser[] = [];
}
