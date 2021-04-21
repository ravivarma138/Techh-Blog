import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../models/authResponse.model';
const USER_API_BASE_URL = environment.userApiUrl;
const POSTS_API_BASE_URL = environment.postsApiUrl;
const AUTH_API_BASE_URL = environment.authApiUrl;
@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {

  userEmail: string = '';

  constructor(
    private http:HttpClient
  ) { }

  public createUser(signUp) : Observable<any> {
    return this.http.post(USER_API_BASE_URL + "save",signUp);
  }

  public generateToken(login) {
    console.log("Entered generateToken method",login.email);
    this.userEmail = login.username;

    return this.http.post<AuthResponse>(AUTH_API_BASE_URL,login).pipe(tap(res => {
      localStorage.setItem('access_token', res.token);
      console.log("Token is",localStorage.getItem('access_token'));
    }));
  }

  public getUserName() {
    console.log('email is',this.userEmail);
    let email = this.userEmail;
    return this.http.get<any>(USER_API_BASE_URL+'findByusername/'+email);
  }

  public getAllUsers() {
    console.log("Entered getAllUsers method");
    return this.http.get(USER_API_BASE_URL + "getAllUsers")
  }
}
