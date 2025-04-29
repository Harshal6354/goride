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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [auth1Guard],
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [auth1Guard],
  },
  {
    path: 'booking/:id',
    component: BookingComponent,
    canActivate: [auth1Guard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [auth1Guard],
  },
  {
    path: 'Ticket',
    component: BookdetailsComponent,
    canActivate: [auth1Guard],
  },
  {
    path: 'offer',
    component: OfferComponent,
    canActivate: [auth1Guard],
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    canActivate: [auth1Guard],
  },
  {
    path: 'need-help',
    component: NeedHelpComponent,
    canActivate: [auth1Guard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
