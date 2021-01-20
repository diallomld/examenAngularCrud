import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/comments/model/comment.model';
import { CommentsService } from '../../service/comments.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  // tslint:disable-next-line:ban-types
  tabcomments?: Comment[];
  comments?: any;
  currentComment?: Comment;
  currentIndex = -1;
  name = '';

  pageSize = 5;
  pageSizes = [5, 10, 15];
  totalItems: number | undefined;
  page = 1;

  constructor(private commentService: CommentsService) {
  }

  ngOnInit(): void {
    this.retrieveComments();
  }

  retrieveComments(): void {
    this.commentService.getAllComments()
      .subscribe(
        data => {
          this.comments = data;
          //console.log(data);
          this.tabcomments = data;
         // this.tabcomments.forEach()

          this.totalItems = data.length;
        },
        error => {
          console.log(error);
        });
  }

  refreshListComment(): void {
    this.retrieveComments();
    this.currentComment = undefined;
    this.currentIndex = -1;
  }

  setActiveComment(comment: Comment, index: number): void {
    this.currentComment = comment;
    this.currentIndex = index;
  }

  removeAllComments(): void {
    this.commentService.deleteAllComments()
      .subscribe(
        response => {
          console.log(response);
          this.refreshListComment();
        },
        error => {
          console.log(error);
        });
  }

  searchName(): void {
    this.commentService.findCommentByName(this.name)
      .subscribe(
        data => {
          this.comments = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  handlePageChange(event: any): void {
    this.page = event;
    this.retrieveComments();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveComments();
  }
}
