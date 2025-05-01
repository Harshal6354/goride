import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-need-help',
  standalone: true,
  imports: [CommonModule, FormsModule, BrowserAnimationsModule],
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.css'],
})
export class NeedHelpComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  toast = inject(ToastrService);
  constructor(private http: HttpClient) {}

  submitHelpForm() {
    if (!this.name || !this.email || !this.message) {
      alert('Please fill all fields');
      return;
    }

    const helpData = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    this.http.post('http://localhost:5000/api/help', helpData).subscribe(
      (response) => {
        this.toast.success('Messge:', 'Successfully receive ');
        console.log('Success', response);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
}
