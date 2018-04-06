
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Account} from '../account/account.component-object';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Tweet } from '../account/tweet.component-object';
import { TweetService } from '../service/tweet.service';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ TweetService ]
})

export class HomeComponent {
  // Fields
  name = 'Kwetter homepage';
  router: Router;
  users: Account[] = [];

  observableTweets: Observable<Tweet[]>;
  observableTweet: Observable<Tweet>;
  tweetsfromfollowers: Tweet[];
  tweet: Tweet;

  constructor(router: Router, private http: Http, private tweetService: TweetService, authenticationService: AuthenticationService) {
    this.router = router;
    const user = authenticationService.checklogin();
    if (user != null) {
      this.getTweetsFromFollowingUsers(user);
    }else {
      this.router.navigate(['/login']);
    }
  }

  getTweetsFromFollowingUsers(name: String) {
    this.observableTweets = this.tweetService.getTweetsFromFollowingUsers(name);
    this.observableTweets.subscribe(tweetsfromfollowers => this.tweetsfromfollowers = tweetsfromfollowers);
  }
}
