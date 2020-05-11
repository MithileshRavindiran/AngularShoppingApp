import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../common/service/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser:AppUser;
  

  constructor(private authService: AuthService) {
    authService.appUser$.subscribe(appUser =>  this.appUser);
   }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
  }

}
