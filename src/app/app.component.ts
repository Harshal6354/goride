import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooComponent } from './pages/footer/foo.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router, private Toast: ToastrService) {}
  title = 'PROject';
  logout() {
    localStorage.removeItem('auth1');
    this.Toast.error('logout', 'Success', {
      positionClass: 'toast-top-right',
      timeOut: 6000,
    });
    this.router.navigateByUrl('login');
  }
}
