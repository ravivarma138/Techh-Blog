import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Optional, NgZone } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostsServiceService } from '../services/posts-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: any = {
    heading: '',
    content: '',
    email: '',
    postedOn: '',
    tags: [],
  };

  visible = true;
  selectable = true;
  removable = true;
  fieldFlag = false;
  validateValue: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['FrontEnd', 'BackEnd', 'Security', 'Authentication', 'Programming'];

  editorForm: FormGroup;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(
    public dialogRef: MatDialogRef<PostEditComponent>,
    private cdr: ChangeDetectorRef,
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private zone:NgZone,
    public dialog: MatDialog,
    private postService: PostsServiceService
  ) {

    this.filteredTags = this.tagControl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

  }

  ngOnInit(): void {
    this.getDateAndUsername();
    this.editorForm  =new FormGroup({
      'content': new FormControl(null)
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagControl.setValue(null);
    console.log("All chips are", this.tags);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    console.log("All chips are", this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  savePost() {
    console.log(this.editorForm.get('content').value);
    if(typeof this.editorForm.get('content').value === 'string') {
      console.log('Found string');
    }
    this.fieldFlag = false;
    this.validateValue = 'Please Enter ';
    let hlen = this.post.heading.length, clen = this.editorForm.get('content').value.length, tlen = this.tags.length;
    if (hlen <= 0 || clen <= 0 || tlen <= 0) {
      console.log("Entered flag check");
      if (hlen == 0) {
        this.validateValue += 'Heading, '
      }

      if (clen == 0) {
        this.validateValue += 'Content, '
      }

      if (tlen == 0) {
        this.validateValue += 'Tags'
      }

      this.validateValue +=' to continue!'
      this.fieldFlag = true;
      this.cdr.detectChanges();
      return;
    }

    console.log("All are right");
    this.fieldFlag = false;
    this.cdr.detectChanges();
    this.post.tags = this.tags;
    this.post.content = this.editorForm.get('content').value;
    this.postService.addPost(this.post).subscribe(resp => {
      console.log("The response is:",resp);
      if (resp) {
        
        this._matSnackBar.open('Post Added!', 'Success', {
          verticalPosition: 'top',
          duration: 4000
        });
        this.router.navigate(['dashboard']).then(() => {
          window.location.reload();
          this.dialog.closeAll();
        });
      } else {
        this._matSnackBar.open('Some problem in adding the Post, Please Try Again!', 'Error', {
          verticalPosition: 'top',
          duration: 4000
        });
      }
    });
  }

  getDateAndUsername() {
    let today = new Date();
    let date = today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear();
    this.post.postedOn = date;
    this.post.email = localStorage.getItem('userName');
  }



}
