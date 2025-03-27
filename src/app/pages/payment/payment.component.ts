import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payments, Card } from '@square/web-sdk';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  router = inject(Router);
  card: Card | null = null; // ✅ Use `Card` instead of `PaymentMethod`
  isPaymentLoading = false;
  errorMessage = '';

  constructor(private toaster: ToastrService) {}

  async ngOnInit() {
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
        this.toaster.success('Payment Successful', 'Rs.100 successful', {
          positionClass: 'toast-top-right',
          titleClass: 'mytoast',
        });
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
}
