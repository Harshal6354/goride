import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  offers = [
    {
      title: 'First Ride Free!',
      description: 'Book your first ride and get 100% cashback up to ₹100.',
      discount: 100,
      image:
        'https://img.freepik.com/free-vector/flat-travel-background_23-2148051402.jpg',
    },
    {
      title: 'Summer Special',
      description: 'Flat 25% off on all bookings above ₹500.',
      discount: 25,
      image:
        'https://img.freepik.com/free-vector/summer-vacation-banner_23-2148582290.jpg',
    },
    {
      title: 'Student Saver',
      description: 'Students get an extra 15% off with valid ID.',
      discount: 15,
      image: 'assets/th (1).jpeg',
    },
    {
      title: 'Student Saver',
      description: 'Students get an extra 15% off with valid ID.',
      discount: 20,
      image: 'assets/wl2.jpg',
    },
    {
      title: 'Student Saver',
      description: 'Students get an extra 15% off with valid ID.',
      discount: 30,
      image: 'assets/myImg.jpg',
    },
  ];

  applyOffer(offer: offer) {
    alert(`Applied Offer: ${offer.title}`);
    this.router.navigateByUrl('serach');
  }
}
