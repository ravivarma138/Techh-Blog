import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserProfileComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }

}
