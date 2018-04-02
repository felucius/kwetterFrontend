
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  // Fields
  name = 'Kwetter';
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
}
