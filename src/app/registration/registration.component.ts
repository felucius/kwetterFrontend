
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { AlertService } from '../service/alert.service';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent {
  name = 'Registration page';

  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.accountService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
