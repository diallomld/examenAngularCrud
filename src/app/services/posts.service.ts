import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

const url = 'http://localhost:3000/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  counter = 0;
  i = 0;
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(url);
  }

  getById(id: any): Observable<Post> {
    return this.http.get(`${url}/${id}`);
  }
  createPost(data: any): Observable<any>{
    return this.http.post(url, data);
  }

  updatePost(id: any, data: any): Observable<any> {
    return this.http.put(url + '/' + id, data);
  }

  deletePost(id: any): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
  deleteAllPosts(): Observable<any> {
    return this.http.delete(url);
  }

  findPostByTitle(title: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${url}?q=${title}`);
  }
}
