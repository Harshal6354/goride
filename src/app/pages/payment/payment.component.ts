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
  card: Card | null = null;
  isPaymentLoading = false;
  errorMessage = '';
  selectedSeats: Seat[] = [];
  totalAmount: number = 0;
  selectedPaymentMethod: 'card' | 'googlePay' | 'paytm' = 'card'; // 🔁 add default

  constructor(private toaster: ToastrService) {}

  async ngOnInit() {
    const totalAmount = localStorage.getItem('totalAmount');
    if (totalAmount) {
      this.totalAmount = JSON.parse(totalAmount);
    }

    if (!window.Square) {
      this.errorMessage = 'Square Web SDK failed to load.';
      return;
    }

    try {
      const payments: Payments = window.Square.payments(
        'sandbox-sq0idb-AHphDBKGrf8boGXMhm0FDQ',
        'sandbox'
      );

      this.card = await payments.card();
      await this.card.attach('#card-container');
    } catch (error) {
      console.error('Payment initialization error:', error);
      this.errorMessage = 'Failed to initialize payment.';
    }
  }

  payWith(method: 'card' | 'googlePay' | 'paytm') {
    this.selectedPaymentMethod = method;
  }

  async handlePayment() {
    this.errorMessage = '';
    this.isPaymentLoading = true;

    if (this.selectedPaymentMethod === 'card') {
      if (!this.card) {
        this.errorMessage = 'Payment method is not available.';
        this.isPaymentLoading = false;
        return;
      }

      try {
        const result = await this.card.tokenize();
        if (result.status === 'OK') {
          this.showSuccess();
        } else {
          this.errorMessage =
            result.errors?.[0]?.message || 'Card payment failed.';
        }
      } catch (error) {
        console.log(error);
        this.errorMessage = 'Card payment failed. Please try again.';
      }
    } else if (this.selectedPaymentMethod === 'googlePay') {
      setTimeout(() => {
        this.showSuccess('Google Pay');
      }, 1500);
    } else if (this.selectedPaymentMethod === 'paytm') {
      setTimeout(() => {
        this.showSuccess('Paytm');
      }, 1500);
    }

    this.isPaymentLoading = false;
  }

  showSuccess(method: string = 'Card') {
    this.toaster.success(
      `${method} Payment Successful`,
      `Rs.${this.totalAmount} paid successfully`,
      {
        positionClass: 'toast-top-right',
        titleClass: 'mytoast',
      }
    );
    this.router.navigate(['Ticket']);
  }
}
