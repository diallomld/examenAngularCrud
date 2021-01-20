import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../model/comment.model';
import { CommentsService } from '../../service/comments.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {

  currentComment: Comment = {
    name: '',
    email: '',
    body: '',
  };
  message = '';
  isUpdated = false;

  constructor(
    private CommentService: CommentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getComment(this.route.snapshot.params.id);
  }

  getComment(id: string): void {
    this.CommentService.getById(id)
      .subscribe(
        data => {
          this.currentComment = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateComment(): void {
    this.CommentService.updateComment(this.currentComment.id, this.currentComment)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Bravo le Comment a été modifier avec success';
          this.isUpdated = true;
        },
        error => {
          console.log(error);
        });
  }

  deleteComment(): void {
    this.CommentService.deleteComment(this.currentComment.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Comments']);
        },
        error => {
          console.log(error);
        });
  }


}
