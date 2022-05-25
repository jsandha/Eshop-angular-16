import { AppUser } from './../models/app-user';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable()
export class AuthService {
  user$!: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService,
    private db: AngularFireDatabase
  ) {
    this.user$ = afAuth.authState;
  }

  currentUser() {
    if (firebase.auth().currentUser) {
      localStorage.setItem('email', firebase.auth().currentUser.email);
      return firebase.auth().currentUser;
    } else return false;
  }

  signIn(username, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  signUp(name, username, password) {
    const auth = getAuth();
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // it copy the url on the address bar

    // stores url in localstorage
    localStorage.setItem('returnUrl', returnUrl);
    return createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        // if we just wanT TO ADD name =>> updateProfile(auth.currentUser, { displayName: name });

        // if more information needs to be added then follow below steps
        this.db
          .object('/users/' + userCredential.user.uid)
          .update({ displayName: name, isAdmin: false });
        let user = userCredential.user;
        return user;
        // ...
      })
      .catch((error) => {
        return new Error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // it copy the url on the address bar
    localStorage.setItem('returnUrl', returnUrl); // stores url in localstorage

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$() {
    //return of(null);
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid); // this and next statement= if there is no user then there is no observable so error with switchmap. so we return observable of null
        return of(null);
      })
    );
  }
}
