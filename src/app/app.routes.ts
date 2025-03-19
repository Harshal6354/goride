import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';
import { auth1Guard } from './services/auth1.guard';
import { PaymentComponent } from './pages/payment/payment.component';
import { BookdetailsComponent } from './pages/bookdetails/bookdetails.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [auth1Guard]
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [auth1Guard]
    },
    {
        path: 'booking',

        component: BookingComponent,
        canActivate: [auth1Guard]
    },
    {
        path: 'booking/:id', component: BookingComponent,
        canActivate: [auth1Guard]
    },
    {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [auth1Guard]
    },
    {
          path:'Ticket',
          component:BookdetailsComponent
    },

    // Catch-all route for unknown paths
    { path: '**', redirectTo: 'login' }
];
