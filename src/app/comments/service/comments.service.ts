import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment.model';

const url = 'https://jsonplaceholder.typicode.com/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  counter = 0;
  i = 0;
  constructor(private http: HttpClient) { }

  getAllComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(url);
  }

  getById(id: any): Observable<Comment> {
    return this.http.get(`${url}/${id}`);
  }
  createComment(data: any): Observable<any>{
    return this.http.post(url, data);
  }

  updateComment(id: any, data: any): Observable<any> {
    return this.http.put(url + '/' + id, data);
  }

  deleteComment(id: any): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }
  deleteAllComments(): Observable<any> {
    return this.http.delete(url);
  }

  findCommentByName(name: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${url}?q=${name}`);
  }
}
