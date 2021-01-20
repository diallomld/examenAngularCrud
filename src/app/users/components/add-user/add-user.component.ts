import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = {
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

  submitted = false;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    const data = {
      name: this.user.name,
      username: this.user.username,
      email: this.user.email,
      address: {
        street: this.user.address?.street,
        suite: this.user.address?.suite,
        city: this.user.address?.city,
        zipcode: this.user.address?.zipcode,
        geo: {
          lt: this.user.address?.geo.lat,
          lng: this.user.address?.geo.lng,
        }
      },
      phone: this.user.phone,
      website: this.user.website,
      company: {
        name: this.user.company?.name,
        catchPhrase: this.user.company?.catchPhrase,
        bs: this.user.company?.bs,

      }
    };

    this.userService.createUser(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
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
  }

}
