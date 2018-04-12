import {Component} from '@angular/core';
import {AccountService} from '../service/account.service';
import {Observable} from 'rxjs/Observable';
import {Account} from '../account/account.component-object';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [AccountService]
})

export class UsersComponent {
  title = 'Kwetter users';

  observableAccounts: Observable<Account[]>;
  accounts: Account[];
  name: String;

  constructor(private router: Router, private accountService: AccountService,
              private authenticationService: AuthenticationService) {
    this.name = authenticationService.checklogin();
    if (this.name != null) {
      this.getUsers();
    } else {
      this.router.navigate(['/login']);
    }
  }

  /*
  User related calls.
   */
  getUsers() {
    this.observableAccounts = this.accountService.getUsers();
    this.observableAccounts.subscribe(accounts => this.accounts = accounts);
  }

  visitUser(name: String) {
    if (name != null) {
      localStorage.setItem('otherUser', name.toString());
      this.router.navigate(['/otheruser']);
    }
  }
}
