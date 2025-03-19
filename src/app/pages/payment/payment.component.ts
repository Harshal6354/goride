import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  router=inject(Router)
  card: any;
  isPaymentLoading = false;
  errorMessage = '';

  async ngOnInit() {
    // Wait for Square SDK to load
    if (!(window as any).Square) {
      this.errorMessage = 'Square Web SDK failed to load.';
      return;
    }

    const payments = (window as any).Square.payments('sandbox-sq0idb-AHphDBKGrf8boGXMhm0FDQ', 'sandbox');
    this.card = await payments.card();
    await this.card.attach('#card-container');
  }

  async handlePayment() {
    this.isPaymentLoading = true;
    this.errorMessage = '';

    try {
      const result = await this.card.tokenize();
      if (result.status === 'OK') {
        alert(`Payment Successful!\nToken: ${result.token}`);
        this.router.navigate(['Ticket'])
       
      } else {
        this.errorMessage = result.errors[0].detail;
      }
    } catch (error) {
      this.errorMessage = 'Payment failed. Please try again.';
    } finally {
      this.isPaymentLoading = false;
    }
  }
}
