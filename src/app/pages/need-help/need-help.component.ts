import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./need-help.component.css'],
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
export class NeedHelpComponent {
  toast = inject(ToastrService);
  submitHelpForm(form: NgForm): void {
    if (form.valid) {
      this.toast.success(
        'Your query has been submitted. We will get back to you shortly.'
      );
      form.reset();
    }
  }
}
