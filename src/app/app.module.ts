import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule} from '@angular/material/menu'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BnNgIdleService } from 'bn-ng-idle';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { CardExpandComponent } from './card-expand/card-expand.component';
import {MatRippleModule} from '@angular/material/core';
import {AutosizeModule} from 'ngx-autosize';
import { PostEditComponent } from './post-edit/post-edit.component';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { QuillModule } from 'ngx-quill';
import { ChatComponent } from './chat/chat.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    SignUpComponent,
    HeaderComponent,
    DashboardComponent,
    UserProfileComponent,
    SessionTimeoutComponent,
    CardExpandComponent,
    PostEditComponent,
    ChatComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    NgbModule,
    MatMenuModule,
    MatProgressBarModule,
    MatChipsModule,
    MatRippleModule,
    AutosizeModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
