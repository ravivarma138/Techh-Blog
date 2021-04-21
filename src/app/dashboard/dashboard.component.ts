import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoginServiceService } from '../services/login-service.service';
import { SessionTimeoutComponent } from '../session-timeout/session-timeout.component';
import { ThemeService } from '../services/theme.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostsModel } from '../models/posts.model';
import { from } from 'rxjs';
import { PostsServiceService } from '../services/posts-service.service';
import { LoaderService } from '../services/loader.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CardExpandComponent } from '../card-expand/card-expand.component';
import { DomSanitizer } from '@angular/platform-browser';
const POSTS_API_BASE_URL = environment.postsApiUrl;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  isDarkTheme : boolean = false;
  isInDashboard: boolean;
  posts : PostsModel[] = [];
  

  constructor(
    private tokenService: LoginServiceService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private sanitizer:DomSanitizer,
    private themeService: ThemeService,
    private loginService: LoginServiceService,
    private http: HttpClient,
    private postsService: PostsServiceService,
    public loaderService: LoaderService
  ) {
    this.themeService.initTheme();
    this.isDarkTheme = this.themeService.isDarkMode();
   }

  ngOnInit(): void {
    this.tokenValidCheck();
    this.getAllPosts();
    this.getUserName();
    this.isInDashboard = true;
    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      if (isTimedOut && this.isInDashboard) {
        console.log('session expired');
        localStorage.removeItem('access_token');
        this.dialog.closeAll();
        this.router.navigate(['']);
        this.dialog.open(SessionTimeoutComponent);
        this.cdr.detectChanges();
      }

    });
  }

  ngOnDestroy() {
    this.isInDashboard = false;
  }


  tokenValidCheck() {
    if(localStorage.getItem('access_token') == null) {
      this.router.navigate(['']);
    }

  }

  getUserName() {
    console.log('Entered getusername function');
    this.loginService.getUserName().subscribe(res => {
      console.log("Entered get username res");
      if(res.code === 200) {
        let username = res.firstName+' '+res.lastName;
        localStorage.setItem('userName', username);
        console.log('username is:',username);
      }
    });
  }

  getAllPosts() {
    this.postsService.getAllPosts().subscribe(resp => {
      console.log(resp);
      if(resp) {
        this.posts = resp as PostsModel[];
      }
    });
    this.posts.forEach(element => {
      this.sanitizer.bypassSecurityTrustHtml(element.content);
    });
    this.cdr.detectChanges();
  }

  expandCard(post) {
    const dialogRef = this.dialog.open(CardExpandComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      hasBackdrop: true,
      data: post
    });
  }

 

  changeTheme() {
    this.isDarkTheme = this.themeService.isDarkMode();
    if(this.isDarkTheme) {
      this.themeService.update('light-mode');
    } else {
      this.themeService.update('dark-mode');
    }
  }

}
