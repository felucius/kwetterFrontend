
import { Component } from '@angular/core';
import { AccountComponentObject } from './account.component-object';
import { AccountService } from '../service/account.service';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [ AccountService ]
})

export class AccountComponent {
  title = 'Account page';

  observableAccounts: Observable<AccountComponentObject[]>;
  observableAccount: Observable<AccountComponentObject>;
  accounts: AccountComponentObject[];
  account: AccountComponentObject;

  constructor(private accountService: AccountService) {
    this.getUsers();
    this.getUser(2);
  }

  getUsers() {
    this.observableAccounts = this.accountService.getUsers();
    this.observableAccounts.subscribe(accounts => this.accounts = accounts);
  }

  getUser(id: number) {
    this.observableAccount = this.accountService.getUser(id);
    this.observableAccount.subscribe(account => this.account = account);
  }

  getTweetsFromUser(name: String){

  }
}
