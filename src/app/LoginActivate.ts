import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {Observable} from 'rxjs';

@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): boolean{
    let ret = false;
    this.authService.isAuthenticated$.subscribe(val => {
      ret = val;
    });
    if (ret){
      return true;
    }
    else {
      this.router.navigate(['accessDenied']);
      return false;
    }
  }
}
