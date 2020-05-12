import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import {of}  from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route:ActivatedRoute, private userService: UserService) { 
    this.user$ =  afAuth.authState;
  }

  login() {
    let  returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get authState() {
    return this.afAuth.authState;
  }

  get appUser$():  Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user =>   {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      }
    )
    )
  }
}
