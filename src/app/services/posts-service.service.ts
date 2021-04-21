import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PostsModel } from '../models/posts.model';

const POSTS_API_BASE_URL = environment.postsApiUrl;
@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  constructor(
    private http:HttpClient
  ) { }

  public getAllPosts(): Observable<PostsModel[]>  {
    console.log("Entered getAllPosts method in postsService");
    return this.http.get<PostsModel[]>(POSTS_API_BASE_URL+"getAllPosts");
  }

  public addPost(post) : Observable<PostsModel> {
    console.log("Entered addPost method in postsService");
    return this.http.post<PostsModel>(POSTS_API_BASE_URL+"save",post);
  }
}
