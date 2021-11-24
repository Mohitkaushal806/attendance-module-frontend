import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mobileNum : any = "";
  otp : any = "123456";
  inputOtp : any = "";
  otpSend : boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  generateOtp() : void {
    this.otpSend = true;
    console.log(this.mobileNum);
  }

  verifyOtp() : void {
    if(this.inputOtp == this.otp){
      console.log("OTP is valid");
      this.router.navigateByUrl("/attendance");
    }else{
      console.log("Invalid Otp");
      
    }
    
  }
}
