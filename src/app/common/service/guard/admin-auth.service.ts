import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService  : AuthService, private userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
    return this.authService.user$.pipe(
      switchMap(user =>   {
        return this.userService.get(user.uid).valueChanges();
      }),
      map (x =>  {
        console.log(x);
        console.log(x.isAdmin);
        return x.isAdmin;
      })
    );
  }
}
