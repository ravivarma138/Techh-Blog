import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from '../services/login-service.service';
import { SignUpModel } from '../models/signUp.model';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUp: SignUpModel = new SignUpModel();
  passwordFlag : boolean = false;
  show_password : boolean = false;
  signUpFlag : boolean = false;
  show_confirm_password : boolean = false;
  constructor(
    public dialogRef: MatDialogRef<SignUpComponent>,
    private cdr: ChangeDetectorRef,
    private _matSnackBar: MatSnackBar,
    private loginService: LoginServiceService
  ) { }

  ngOnInit(): void {
  }

   myFunction(filter) {
     console.log("Filter is", filter);
     if(filter != 'confirm') {
      this.show_password = !this.show_password;
     } else this.show_confirm_password = !this.show_confirm_password;
     console.log("The entered data is",this.signUp);
     this.cdr.detectChanges();
  
    }


    saveUser() {
      if(this.signUp.password != this.signUp.confirmPassword) {
        this.passwordFlag = true;
      } else {
        this.passwordFlag = false;
        this.loginService.createUser(this.signUp).subscribe(resp => {
          console.log("The response is:",resp);
          if (resp.code === 200) {
            this.signUpFlag = true;
            this._matSnackBar.open('User Added!', 'Success', {
              verticalPosition: 'top',
              duration: 4000
            });
          } else {
            this._matSnackBar.open('Some problem in adding the User, Please Try Again!', 'Error', {
              verticalPosition: 'top',
              duration: 4000
            });
          }
        });
      }
    }
}
