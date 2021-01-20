import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/comments/model/comment.model';
import { Post } from '../model/post.model';

const url = 'https://jsonplaceholder.typicode.com/posts';

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
  getCommentToPost(id: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(url + '/' + id + '/comments');
  }
}
