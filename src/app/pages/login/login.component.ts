import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { user } from '../../core/model/class/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // User Object for login
  registerObj: user = new user({
    userName: '',
    password: '',
    emailId: '',
  });

  // User Object for sign-up
  signUpObj: user = new user({
    userName: '',
    password: '',
    emailId: '',
  });

  isLogin = true; // This controls the toggle between Login and Sign-in

  constructor(private toast: ToastrService, private router: Router) {}

  // Login method
  goToHome() {
    if (
      this.registerObj.userName === this.signUpObj.userName &&
      this.registerObj.password === this.signUpObj.password
    ) {
      localStorage.setItem('auth1', 'true');

      this.toast.success('Login Successful', 'Welcome', {
        positionClass: 'toast-top-left',
        timeOut: 5000,
      });

      this.router.navigate(['/search']);
    } else {
      alert('Incorrect credentials. Please try again.');
    }
  }

  // Toggle between Login and Sign-in
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  // Handle sign-up (you can replace this with actual registration logic)
  handleSignUp() {
    if (
      this.signUpObj.userName &&
      this.signUpObj.password &&
      this.signUpObj.emailId
    ) {
      this.toast.success('Sign-up Successful', 'Welcome', {
        positionClass: 'toast-top-left',
        timeOut: 5000,
      });

      // Navigate to login page after successful sign-up
      this.toggleForm(); // Switch to Login form after Sign-up
    } else {
      alert('Please fill in all fields');
    }
  }
}
