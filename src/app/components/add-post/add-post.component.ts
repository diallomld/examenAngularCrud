import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: Post = {
    title: '',
    body: ''
  };

  submitted = false;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }

  savePost(): void {
    const data = {
      title: this.post.title,
      body: this.post.body
    };

    this.postService.createPost(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newPost(): void {
    this.submitted = false;
    this.post = {
      title: '',
      body: ''
    };
  }

}
