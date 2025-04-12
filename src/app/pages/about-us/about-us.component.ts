import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class AboutUsComponent {
  toast = inject(ToastrService);
  submitContact(form: NgForm) {
    if (form.valid) {
      this.toast.success("'Message Sent!\nWe will get back to you shortly.'");
      form.reset();
    }
  }
}
