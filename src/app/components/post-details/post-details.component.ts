import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

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

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.params.id);
  }

  getTutorial(id: string): void {
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
