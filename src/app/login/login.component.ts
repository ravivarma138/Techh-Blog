import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import { LoginModel } from '../models/login.model';
import { SessionTimeoutComponent } from '../session-timeout/session-timeout.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginModel = new LoginModel();
  loginFlag : boolean = false;
  spinnerFlag: boolean = false;
  constructor(public dialog: MatDialog,
    private router: Router,
    private loginService: LoginServiceService,
    ) { }

  ngOnInit(): void {
    this.clearToken();
  }

  clearToken() {
    localStorage.removeItem('access_token');
  }

  openSignUpDialog() {
    console.log("Fuck It");
    this.dialog.open(SignUpComponent, {
      width: '600px'
    });
    //this.dialog.open(SessionTimeoutComponent);
  }

  loginUser() {
    this.spinnerFlag = true;
    localStorage.setItem('userName',this.login.username);
    this.loginService.generateToken(this.login).subscribe(resp => {
      console.log("Hoa");
      if(localStorage.getItem('access_token').length > 0) {
        this.router.navigate(['dashboard']);
      } else {
        this.loginFlag = true;
      }
      this.spinnerFlag = false;
    }, error1 => {
      this.loginFlag = true;
      this.spinnerFlag = false;
    });
    
    
  }

}
