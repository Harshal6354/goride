import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooComponent } from './pages/footer/foo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooComponent, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'PROject';
  showNavAndFooter: boolean = true;

  constructor(private router: Router, private Toast: ToastrService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavAndFooter = event.url !== '/login';
      }
    });
  }

  logout() {
    localStorage.removeItem('auth1');
    this.Toast.error('logout', 'Success', {
      positionClass: 'toast-top-right',
      timeOut: 6000,
    });
    this.router.navigateByUrl('login');
  }
}
