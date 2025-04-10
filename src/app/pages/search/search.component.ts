import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Bus } from '../../core/model/interface/bus.model';
import { MasterService } from '../../services/master.service';
interface faqList {
  question: string;
  answer: string;
  open: boolean;
}
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  router = inject(Router);
  constructor(private service1: MasterService) {}
  busList: Bus[] = [
    {
      price: 1000,
      totalSeats: 35,
      availableSeat: 22,
      arrivalTime: '2025-02-21 T07:00:10',
      scheduleID: 5,
      departureTime: '2025-02-21T17:00:04',
      busName: 'Raj-ahme',
      fromLocation: 'Rajkot',
      toLocation: 'ahmedabad',
      rating: 4.0,
    },
    {
      price: 900,
      totalSeats: 30,
      availableSeat: 3,
      arrivalTime: '2025-02-21 T07:00:10',
      scheduleID: 3,
      departureTime: '2025-02-21 T17:00:04',
      busName: 'super-Mumbai',
      fromLocation: 'Mumbai',
      toLocation: 'Narol',
      rating: 4.5,
    },
    {
      price: 800,
      totalSeats: 10,
      availableSeat: 3,
      arrivalTime: '2025-02-21 T07:00:10',
      scheduleID: 3,
      departureTime: '2025-02-21T17:00:04',
      busName: 'star-pune',
      fromLocation: 'pune',
      toLocation: 'vadodara',
      rating: 3.5,
    },
    {
      price: 1200,
      totalSeats: 30,
      availableSeat: 15,
      arrivalTime: '2025-02-21 T08:00:10',
      scheduleID: 4,
      departureTime: '2025-02-21 T18:00:04',
      busName: 'Nagpur',
      fromLocation: 'Himalaya',
      toLocation: 'Delhi',
      rating: 4.9,
    },
    {
      price: 1200,
      totalSeats: 30,
      availableSeat: 15,
      arrivalTime: '2025-02-21 T08:00:10',
      scheduleID: 4,
      departureTime: '2025-02-21 T18:00:04',
      busName: 'Ahmedabad',
      fromLocation: 'Ahmedabad',
      toLocation: 'Gandhinagar',
      rating: 3.5,
    },
    {
      price: 1200,
      totalSeats: 30,
      availableSeat: 15,
      arrivalTime: '2025-02-21 T08:00:10',
      scheduleID: 4,
      departureTime: '2025-02-21 T18:00:04',
      busName: 'Surat',
      fromLocation: 'Surat',
      toLocation: 'Chennai',
      rating: 3.2,
    },
    {
      price: 1200,
      totalSeats: 30,
      availableSeat: 15,
      arrivalTime: '2025-02-21 T08:00:10',
      scheduleID: 4,
      departureTime: '2025-02-21 T18:00:04',
      busName: 'Gandhinagar',
      fromLocation: 'Katch',
      toLocation: 'Gandhinagar',
      rating: 3.9,
    },
    {
      price: 1000,
      totalSeats: 40,
      availableSeat: 20,
      arrivalTime: '2025-02-21T07:00:10',
      scheduleID: 6,
      departureTime: '2025-02-21T17:00:04',
      busName: 'Solapur',
      fromLocation: 'Delhi',
      toLocation: 'Solapur',
      rating: 4.8,
    },
    {
      price: 1000,
      totalSeats: 35,
      availableSeat: 22,
      arrivalTime: '2025-02-21T07:00:10',
      scheduleID: 5,
      departureTime: '2025-02-21T17:00:04',
      busName: 'Raj-ahme 2.0',
      fromLocation: 'Rajkot',
      toLocation: 'ahmedabad',
      rating: 4.0,
    },
  ];
  newbusList: Bus[] = [];
  searchObj: Partial<Bus> = {
    fromLocation: '',
    toLocation: '',
  };

  onSearch() {
    const { fromLocation, toLocation } = this.searchObj;
    console.log('From:', fromLocation, 'To:', toLocation); // Debugging line
    if (!fromLocation || !toLocation) {
      return;
    }
    this.newbusList = this.busList.filter(
      (item) =>
        item.fromLocation.toLowerCase() === fromLocation.toLowerCase() &&
        item.toLocation.toLowerCase() === toLocation.toLowerCase()
    );

    console.log('Filtered Bus List:', this.newbusList); // Debugging line
  }
  goToBooking2(busList: Bus) {
    this.router.navigate(['/booking'], {
      queryParams: {
        totalSeats: busList.totalSeats,
        availableSeats: busList.availableSeat,
        price: busList.price,
      },
    });
  }
  gotobookingFromS() {
    this.router.navigate(['/booking']);
  }

  faqList: faqList[] = [
    {
      question: 'How do I book a bus ticket?',
      answer:
        'Select your source, destination, and date, then choose a bus and proceed with payment.',
      open: false,
    },
    {
      question: 'Can I cancel my ticket?',
      answer:
        'Yes, you can cancel your ticket from the "My Bookings" section before the departure time.',
      open: false,
    },
    {
      question: 'Do I need to carry a printout?',
      answer: 'yes, you can show the e-ticket on your mobile.',
      open: false,
    },
    {
      question: 'Can I apply special offer code?',
      answer: 'yes, you can apply offer code on ticket section.',
      open: false,
    },
  ];
  newQuestion: string = '';
  QuestionSubmited: boolean = false;
  toggle(item: faqList) {
    item.open = !item.open;
  }
  handleKey(event: KeyboardEvent, item: faqList) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle(item);
    }
  }

  SubmitQuestions() {
    if (this.newQuestion.trim()) {
      this.QuestionSubmited = true;
      this.newQuestion = '';
      setTimeout(() => {
        this.QuestionSubmited = false;
      }, 3000);
    }
  }
}
