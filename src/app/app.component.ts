import { Component } from '@angular/core';
import { AuthService } from './common/service/auth.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { UserService } from './common/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MithiOrganicShop';

  constructor(private userService: UserService, private authService:AuthService, router  : Router) {
    authService.user$.subscribe(user  => {
      if (user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
