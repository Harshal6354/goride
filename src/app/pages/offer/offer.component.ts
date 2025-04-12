import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
interface offer {
  title: string;
  description: string;
  discount: number;
  image: string;
}
@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent {
  router = inject(Router);
  toast = inject(ToastrService);
  offers = [
    {
      title: 'First Ride Free!',
      description: 'Book your first ride and get 100% cashback up to ₹100.',
      discount: 100,
      image:
        'https://static.abhibus.com/offerbanners/Apr2025/12/1744396792-720x360HYDVSPKSUPER60.png',
    },
    {
      title: 'IPL Special',
      description: 'Flat 25% off on all bookings above ₹500.',
      discount: 25,
      image:
        'https://static.abhibus.com/offerbanners/Apr2025/12/1744396546-720x360LSGVSGTSUPER60.png',
    },
    {
      title: 'Student Saver',
      description: 'Students get an extra 15% off with valid ID.',
      discount: 15,
      image:
        'https://th.bing.com/th/id/OIP.cf9yv8YDkkaBtY6Dgj91fQHaDt?w=311&h=174&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      title: 'Student Saver',
      description: 'Students get an extra 15% off with valid ID.',
      discount: 20,
      image:
        'https://th.bing.com/th/id/OIP.lu6I4bQHmicYniY3g7q9UAAAAA?w=304&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
    {
      title: 'Student Saver',
      description: 'Students get an extra 15% off with valid ID.',
      discount: 30,
      image:
        'https://th.bing.com/th/id/OIP.1QaBWmDcmgSP3xMx-5uYZgHaFk?w=236&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    },
  ];

  applyOffer(offer: offer) {
    this.toast.success(`Applied Offer: ${offer.title}`, '', { timeOut: 5000 });
    this.router.navigateByUrl('serach');
  }
}
