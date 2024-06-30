import { Injectable } from '@angular/core';
import { AddPost } from '../models/add-post.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { EditPost } from '../models/edit-post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(data: AddPost): Observable<Post> {
    return this.http.post<Post>(
      `${environment.apiBaseUrl}/api/posts?addAuth=true`,
      data
    );
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/api/posts`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/api/posts/${id}`);
  }

  getPostByUrlHandle(urlHandle: string): Observable<Post> {
    return this.http.get<Post>(
      `${environment.apiBaseUrl}/api/posts/${urlHandle}`
    );
  }

  editPost(id: string, editedPost: EditPost): Observable<Post> {
    return this.http.put<Post>(
      `${environment.apiBaseUrl}/api/posts/${id}?addAuth=true`,
      editedPost
    );
  }

  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(
      `${environment.apiBaseUrl}/api/posts/${id}?addAuth=true`
    );
  }
}
