import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;


constructor(
      private afAuth: AngularFireAuth,
      private route: ActivatedRoute,
      private userService: UserService) {
    this.user$ = afAuth.authState;
   }

login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';   // it copy the url on the address bar
  localStorage.setItem('returnUrl', returnUrl);                                 // stores url in localstorage

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

logout(){
  this.afAuth.signOut();
  }

get appUser$(): Observable<AppUser>{
  return this.user$
  .pipe(
    switchMap(user => {
      if (user) this.userService.get(user.uid); // this and next statement= if there is no user then there is no observable so error with swtichmap. so we retun observable of null
       return of(null);
    }
      ))
  }
}
