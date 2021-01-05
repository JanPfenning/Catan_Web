import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  authService: AuthService;
  router: Router;
  @Input()
  loggedIn: boolean;

  constructor(authService: AuthService,
              router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
  }


  login(): void{
    this.authService.loginWithRedirect();
  }

  logout(): void{
    // TODO redirect
    this.authService.logout();
  }

  home(): void{
    this.router.navigate(['']);
  }
}
