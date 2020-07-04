import { Component } from '@angular/core';
import { AuthService } from 'shared/common/service/auth.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { UserService } from 'shared/common/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MithiOrganicShop';

  constructor(private userService: UserService, private authService: AuthService, router: Router) {
    console.log('inside app componen');
    authService.user$.subscribe(user => {

      if (!user) return

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    })
  }
}
