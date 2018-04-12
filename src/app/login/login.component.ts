import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {Account} from '../account/account.component-object';

@Component({
  moduleId: module.id,
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  user: Account;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.name, this.model.password)
      .subscribe(user => {
        if (user != null) {
          this.authenticationService.generateToken(user)
            .subscribe(token => {
              if (token != null) {
                this.router.navigate(['/profile']);
              }
            });
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
