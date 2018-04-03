
import { Component } from '@angular/core';
import { Tweet } from './tweet.component-object';
import { TweetService } from '../service/tweet.service';
import { Observable } from 'rxjs/Observable';

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

  constructor(private tweetService: TweetService) {
    this.getTweetsFromUser('maxime');
  }

  getTweetsFromUser(name: String) {
    this.observableTweets = this.tweetService.getTweetsFromUser(name);
    this.observableTweets.subscribe(tweets => this.tweets = tweets);
  }
}
