import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/comments/model/comment.model';
import { Post } from 'src/app/posts/model/post.model';
import { PostsService } from 'src/app/posts/service/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  currentPost: Post = {
    title: '',
    body: '',
  };
  message = '';
  isUpdated = false;
  comments: Comment[] = [];

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    const id = this.route.snapshot.params.id;
    this.getPost(id);
    this.postService.getCommentToPost(id).subscribe(
      data => {
        this.comments = data;
      },
      err => console.error(err)
    );
  }

  getPost(id: string): void {
    this.postService.getById(id)
      .subscribe(
        data => {
          this.currentPost = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updatePost(): void {
    this.postService.updatePost(this.currentPost.id, this.currentPost)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Bravo le post a été modifier avec success';
          this.isUpdated = true;
        },
        error => {
          console.log(error);
        });
  }

  deletePost(): void {
    this.postService.deletePost(this.currentPost.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/posts']);
        },
        error => {
          console.log(error);
        });
  }

}
