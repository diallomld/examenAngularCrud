import { Component, OnInit } from '@angular/core';
import { Comment } from '../../model/comment.model';
import { CommentsService } from '../../service/comments.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  comment: Comment = {
    name: '',
    email: '',
    body: ''
  };

  submitted = false;

  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
  }

  saveComment(): void {
    const data = {
      name: this.comment.name,
      email: this.comment.email,
      body: this.comment.body
    };

    this.commentService.createComment(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newComment(): void {
    this.submitted = false;
    this.comment = {
      name: '',
      email: '',
      body: ''
    };
  }

}
