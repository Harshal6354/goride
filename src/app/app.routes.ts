import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { BookdetailsComponent } from './pages/bookdetails/bookdetails.component';
import { OfferComponent } from './pages/offer/offer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NeedHelpComponent } from './pages/need-help/need-help.component';
import { auth1Guard } from './guard/auth1.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },

  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'booking',
    component: BookingComponent,
  },
  {
    path: 'booking/:id',
    component: BookingComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'Ticket',
    component: BookdetailsComponent,
  },
  {
    path: 'offer',
    component: OfferComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'need-help',
    component: NeedHelpComponent,
  },
  {
    path: '**',
    redirectTo: 'search',
  },
];
