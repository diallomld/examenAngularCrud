import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/posts/model/post.model';
import { User } from '../../model/user.model';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUser: User = {
      name: '',
      username: '',
      email: '',
      address : {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: ''
          }
        },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      },
  };
  message = '';
  isUpdated = false;
  posts: Post[] = [];

  constructor(
    private UserService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    const id = this.route.snapshot.params.id;
    this.getUser(id);
    this.UserService.getPostToUser(id).subscribe(
      data => {
        this.posts = data;
        console.log(data);
      },
      err => console.error(err)
    );
  }

  getUser(id: string): void {
    this.UserService.getById(id)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateUser(): void {
    this.UserService.updateUser(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'Bravo le User a été modifier avec success';
          this.isUpdated = true;
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(): void {
    this.UserService.deleteUser(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

}
