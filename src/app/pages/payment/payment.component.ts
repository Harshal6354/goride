import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payments, Card } from '@square/web-sdk';
import { Seat } from '../../core/model/interface/seat.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  router = inject(Router);
  card: Card | null = null; // ✅ Use `Card` instead of `PaymentMethod`
  isPaymentLoading = false;
  errorMessage = '';
  selectedSeats: Seat[] = []; // Stores currently selected seats for booking
  totalAmount: number = 0;

  constructor(private toaster: ToastrService) {}

  async ngOnInit() {
    const totalAmount = localStorage.getItem('totalAmount');
    if (totalAmount) {
      this.totalAmount = JSON.parse(totalAmount);
    }

    // Ensure Square SDK is loaded

    if (!window.Square) {
      this.errorMessage = 'Square Web SDK failed to load.';
      return;
    }

    try {
      // Initialize Square Payments
      const payments: Payments = window.Square.payments(
        'sandbox-sq0idb-AHphDBKGrf8boGXMhm0FDQ',
        'sandbox'
      );

      // Create a card payment instance
      this.card = await payments.card();
      await this.card.attach('#card-container');
    } catch (error) {
      console.error('Payment initialization error:', error);
      this.errorMessage = 'Failed to initialize payment.';
    }
  }

  async handlePayment() {
    if (!this.card) {
      this.errorMessage = 'Payment method is not available.';
      return;
    }

    this.isPaymentLoading = true;
    this.errorMessage = '';

    try {
      const result = await this.card.tokenize(); // ✅ Now tokenize() exists
      this.isPaymentLoading = true;

      if (result.status === 'OK') {
        this.toaster.success(
          'Payment Successful',
          `${this.totalAmount} successfull `,
          {
            positionClass: 'toast-top-right',
            titleClass: 'mytoast',
          }
        );
        this.router.navigate(['Ticket']);
      } else if (result.errors && result.errors.length > 0) {
        this.errorMessage = result.errors[0]?.message || 'Payment failed.';
      } else {
        this.errorMessage = 'Payment failed.';
      }
    } catch (error) {
      console.error('Tokenization error:', error);
      this.errorMessage = 'Payment failed. Please try again.';
    } finally {
      this.isPaymentLoading = false;
    }
  }
  offers = [
    {
      img: 'assets/20discont.jpeg',
      title: 'Special Offers 🎉',
      text: 'Exclusive holiday discounts on all tickets. Book now and save big!',
    },
    {
      img: 'assets/5.webp',
      title: 'Card Discounts 🎉',
      text: 'Exclusive Card discounts on all tickets. Book now and save big!',
    },
    {
      img: 'assets/4.png',
      title: 'IPL Offers 🎉',
      text: '300 Rs discount on card',
    },
    {
      img: 'assets/2.png',
      title: 'IPL Offers 🎉',
      text: '400 Rs discount on card',
    },
  ];

  offerApplied = false;

  // applyDiscount() {
  //   if (!this.offerApplied) {
  //     this.totalAmount = Math.max(this.totalAmount - 100, 0); // avoid negative total
  //     this.toaster.success('₹100 Discount Applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //     this.offerApplied = true;
  //   } else {
  //     this.toaster.info('Discount already applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //   }
  // }
  // applyDiscount1() {
  //   if (!this.offerApplied) {
  //     this.totalAmount = Math.max(this.totalAmount - 200, 0); // avoid negative total
  //     this.toaster.success('₹100 Discount Applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //     this.offerApplied = true;
  //   } else {
  //     this.toaster.info('Discount already applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //   }
  // }
  // applyDiscount2() {
  //   if (!this.offerApplied) {
  //     this.totalAmount = Math.max(this.totalAmount - 300, 0); // avoid negative total
  //     this.toaster.success('₹100 Discount Applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //     this.offerApplied = true;
  //   } else {
  //     this.toaster.info('Discount already applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //   }
  // }
  // applyDiscount3() {
  //   if (!this.offerApplied) {
  //     this.totalAmount = Math.max(this.totalAmount - 400, 0); // avoid negative total
  //     this.toaster.success('₹100 Discount Applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //     this.offerApplied = true;
  //   } else {
  //     this.toaster.info('Discount already applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //   }
  // }
  // applyDiscount4() {
  //   if (!this.offerApplied) {
  //     this.totalAmount = Math.max(this.totalAmount - 100, 0); // avoid negative total
  //     this.toaster.success('₹100 Discount Applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //     this.offerApplied = true;
  //   } else {
  //     this.toaster.info('Discount already applied!', '', {
  //       positionClass: 'toast-top-center',
  //     });
  //   }
  // }
  hoveredIndex = -1; // To track hovered image

  applyDiscountByIndex(index: number) {
    if (!this.offerApplied) {
      const discounts = [100, 200, 300, 400, 500]; // You can update these as per logic
      const discount = discounts[index] || 100;
      this.totalAmount = Math.max(this.totalAmount - discount, 0);
      this.toaster.success(`₹${discount} Discount Applied!`, '', {
        positionClass: 'toast-top-center',
      });
      this.offerApplied = true;
    } else {
      this.toaster.info('Discount already applied!', '', {
        positionClass: 'toast-top-center',
      });
    }
  }
}
