import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.css']
})
export class SessionTimeoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SessionTimeoutComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
