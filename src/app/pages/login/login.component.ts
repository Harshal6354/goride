import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  router = inject(Router);
  masterSrv = inject(MasterService);
   loggedUserData: any;
   registerObj: any ={
    "userId": 0,
    "userName": "harshal",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createDate": new Date(),
    "password": "1234",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()
  };
  goToHome() {  
    if(this.registerObj.userName==="harshal" && this.registerObj.password=="1234"){
      localStorage.setItem('auth1', 'true');
      alert("Login Successfully");
      this.router.navigate(['/search']);
    }
    else{
      alert("wrong credential")
    } 
}
  

}
