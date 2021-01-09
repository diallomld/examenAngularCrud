import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}


  signUp(): void {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    this.auth.createNewUser(email, password).then(
      (resp) => {
        console.log('inscription ok');
        this.router.navigateByUrl('/posts');
      }).catch(
        (error) => {
          console.log('erreur d\'inscription');
          this.errorMessage = error;
        }
      );
  }

}
