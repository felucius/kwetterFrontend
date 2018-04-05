
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Account} from '../account/account.component-object';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  // Fields
  name = 'Kwetter';
  router: Router;
  users: Account[] = [];

  constructor( router: Router) {
    this.router = router;
  }

  ngOnInit() {
  }
}
