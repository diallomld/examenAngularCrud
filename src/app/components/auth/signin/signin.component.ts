import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

// declare provider: firebase.default.auth.FacebookAuthProvider();

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  provider = new firebase.default.auth.FacebookAuthProvider();
  form: FormGroup;
  errorMessage: string | undefined;
  message: string | undefined;
  isConnected: boolean | undefined;



  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }


  signIn(): void {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    this.auth.signInUser(email, password).then(
      (resp) => {
        console.log('Connexion ok');
        this.message = 'Connexion reussit';
        this.isConnected = true;
        this.router.navigateByUrl('/users');
      }).catch(
        (error) => {
          console.log('erreur de Connexion');
          this.errorMessage = error;
        }
      );
  }
  fbLogin(): void{
    firebase.default.auth().signInWithPopup(this.provider)
    .then((result) => {
      console.log(JSON.stringify(result.user));
      this.router.navigateByUrl('/users');
    })
    .catch((error) => {
      console.error(JSON.stringify(error));
    });
  }


}
