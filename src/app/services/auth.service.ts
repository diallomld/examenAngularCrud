import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.createUserWithEmailAndPassword(email, password).then(
          (resp) => {
            console.log('inscription reussit');
            resolve(resp);
          }).catch(
            (error) => {
              console.log('erreur');
              reject(error)
            }
          );
      }
    );
  }
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(
          (resp) => {
            console.log('connection reussit');
            resolve(resp);
          }).catch(
            (error) => {
              console.log('erreur');
              reject(error);
            }
          );
      }
    );
  }

  signOutUser(): void {
    this.afAuth.signOut();
}
}
