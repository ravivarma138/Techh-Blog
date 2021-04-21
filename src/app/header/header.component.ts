import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostEditComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router,
    public dialog: MatDialog,
    private _matSnackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem("access_token");
    this.router.navigate(['']);
  }

  talkButton() {
    this._matSnackBar.open('Feature Yet to be added, sry for the delay!', 'Wait', {
      verticalPosition: 'top',
      duration: 4000
    });
  }

  addPost() {
    const dialogRef = this.dialog.open(PostEditComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      hasBackdrop: true,
    });
  }

}
