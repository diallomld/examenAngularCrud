import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: any;
  currentUser?: User;
  currentIndex = -1;
  name = '';

  pageSize = 5;
  pageSizes = [5, 10];
  totalItems: number | undefined;
  page = 1;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAllUsers()
      .subscribe(
        data => {
          this.users = data;
          //console.log(data);
         // this.tabcomments = data;
         // this.tabcomments.forEach()

          this.totalItems = data.length;
        },
        error => {
          console.log(error);
        });
  }

  refreshListUsers(): void {
    this.retrieveUsers();
    this.currentUser = undefined;
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  removeAllUsers(): void {
    this.userService.deleteAllUsers()
      .subscribe(
        response => {
          console.log(response);
          this.refreshListUsers();
        },
        error => {
          console.log(error);
        });
  }

  searchName(): void {
    this.userService.findUserByName(this.name)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  handlePageChange(event: any): void {
    this.page = event;
    this.retrieveUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveUsers();
  }

}
