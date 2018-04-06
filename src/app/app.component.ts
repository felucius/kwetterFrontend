import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from "./service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kwetter';
  home = 'Home';
  profile = 'Profile';
  register = 'Register';

  userLogedIn: String;
  router: Router;

  loggedIn: any;

  constructor(router: Router, private authentication: AuthenticationService) {
    this.router = router;
    this.loggedIn = this.authentication.isLoggedIn;
  }
}
