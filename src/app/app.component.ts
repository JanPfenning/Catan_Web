import { Component } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catan-web';
  loggedIn = false;
  authService: AuthService;
  router: Router;

  constructor(authService: AuthService,
              router: Router){
    this.authService = authService;

    this.authService.isAuthenticated$.subscribe(val => {
      this.loggedIn = val;
    });
  }
}
