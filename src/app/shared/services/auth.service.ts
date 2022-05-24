import { AppUser } from './../models/app-user';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user$!: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // it copy the url on the address bar
    localStorage.setItem('returnUrl', returnUrl); // stores url in localstorage

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    //return of(null);
    return this.user$.pipe(
      switchMap((user) => {
        if (user) return this.userService.get(user.uid); // this and next statement= if there is no user then there is no observable so error with switchmap. so we return observable of null
        return of(null);
      })
    );
  }
}
