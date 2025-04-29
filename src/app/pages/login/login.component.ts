import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { user } from '../../core/model/class/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
interface mes {
  message: string;
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  userName: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService,
    private toast: ToastrService
  ) {}

  SignUp() {
    this.isLogin = false;
    const SignUpData = {
      email: this.email,
      userName: this.userName,
      password: this.password,
    };

    this.http
      .post<mes>('http://localhost:5000/user-signin', SignUpData)
      .subscribe({
        next: (res) => {
          this.toast.success(res.message); // "Login successful"

          console.log('✅ User:', res.message);

          // Optionally store token
          this.cookie.set('token', res.token, 7);
        },
        error: (err) => {
          console.error(err);
          alert(err.error.message || 'Login failed.');
        },
      });
    this.isLogin = true;
  }

  isLogin = true;

  toggleForm(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    // Reset fields if needed
    this.userName = '';
    this.email = '';
    this.password = '';
  }

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
    };
    // handle login logic here
    this.http
      .post<mes>('http://localhost:5000/user-login', loginData)
      .subscribe({
        next: (res) => {
          this.toast.success(res.message, 'login succes');
          if (res.message) {
            this.cookie.set('token', res.token, 7);
            console.log('login success', res.message);
            this.router.navigateByUrl('search');
          }
        },
        error: (err) => {
          this.toast.error('Login', 'Failed please sign-up');
          console.error(err);
        },
      });
    console.log(loginData);
  }
}
