import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsModel } from '../models/posts.model';

@Component({
  selector: 'app-card-expand',
  templateUrl: './card-expand.component.html',
  styleUrls: ['./card-expand.component.css']
})
export class CardExpandComponent implements OnInit {

  post: any = {
    heading: '',
    content: '',
    email: '',
    postedOn: '',
    postId: '',
    tags: [],
  };

  constructor(
    public dialogRef: MatDialogRef<CardExpandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    if(this.data) {
      console.log("Entered");
      this.post.content = this.data.content;
      this.post.email = this.data.email;
      this.post.heading = this.data.heading;
      this.post.postedOn = this.data.postedOn;
      this.post.tags = this.data.tags;
    }

    console.log("After populating post object value is:", this.post);

  }

}
