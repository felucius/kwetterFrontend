
import { Component } from '@angular/core';
import { Tweet } from './tweet.component-object';
import { TweetService } from '../service/tweet.service';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "../service/authentication.service";

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [ TweetService ]
})

export class TweetComponent {

  observableTweets: Observable<Tweet[]>;
  observableTweet: Observable<Tweet>;
  tweets: Tweet[];
  tweet: Tweet;

  constructor(private tweetService: TweetService, private authenticationService: AuthenticationService) {
    const user = authenticationService.checklogin();
    this.getTweetsFromUser(user);
  }

  getTweetsFromUser(name: String) {
    this.observableTweets = this.tweetService.getTweetsFromUser(name);
    this.observableTweets.subscribe(tweets => this.tweets = tweets);
  }
}
