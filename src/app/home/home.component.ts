
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Account} from '../account/account.component-object';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Tweet } from '../account/tweet.component-object';
import { TweetService } from '../service/tweet.service';
import { AuthenticationService } from '../service/authentication.service';
import { AccountService } from '../service/account.service';
import { AlertService } from '../service/alert.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ TweetService, AccountService ]
})

export class HomeComponent {
  // Fields
  model: any = {};
  loading = false;
  error = '';

  title = 'Kwetter homepage';
  router: Router;

  observableTweets: Observable<Tweet[]>;
  observableTweet: Observable<Tweet>;
  observableTweetLikes: Observable<Tweet[]>;
  observableMentions: Observable<Account[]>;

  tweetsfromfollowers: Tweet[];
  tweetLikesFromUser: Tweet[];
  tweetMentions: Account[];
  tweets: Tweet[];
  searchTweets: Tweet[];

  observableAccount: Observable<Account>;
  account: Account;
  name: String;
  constructor(router: Router, private http: Http, private tweetService: TweetService,
              private authenticationService: AuthenticationService, private accountService: AccountService,
              private alertService: AlertService) {
    this.router = router;
    this.name = authenticationService.checklogin();
    if (this.name != null) {

      this.getUser(this.name);
      this.getTweetsFromFollowingUsers(this.name);
      this.getTweetsFromUser(this.name);
      this.getTweetLikesFromUser(2);
      this.getTweetMentions(2);
    }else {
      this.router.navigate(['/login']);
    }
  }

  getTweetsFromFollowingUsers(name: String) {
    this.observableTweets = this.tweetService.getTweetsFromFollowingUsers(name);
    this.observableTweets.subscribe(tweetsfromfollowers => this.tweetsfromfollowers = tweetsfromfollowers);
  }

  getTweetLikesFromUser(tweetId: number) {
    this.observableTweetLikes = this.tweetService.getTweetLikesFromUser(tweetId);
    this.observableTweetLikes.subscribe(tweetLikesFromUser => this.tweetLikesFromUser = tweetLikesFromUser);
  }

  getTweetMentions(tweetId: number) {
    this.observableMentions = this.accountService.getTweetMentions(tweetId);
    this.observableMentions.subscribe(tweetMentions => this.tweetMentions = tweetMentions);
  }

  getUser(name: String) {
    this.observableAccount = this.accountService.getUser(name);
    this.observableAccount.subscribe(account => this.account = account);
  }

  addMessage(message: String) {
    this.loading = true;
    this.tweetService.addTweet(this.model, this.account)
      .subscribe(
        data => {
          this.alertService.success('New kweet succesfully added', true);
          alert('Succesfully added a new tweet.');
          this.load();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  getTweetsFromUser(name: String) {
    this.observableTweets = this.tweetService.getTweetsFromUser(name);
    this.observableTweets.subscribe(tweets => this.tweets = tweets);
  }

  searchTweetByTag(tag: String) {
    this.observableTweets = this.tweetService.searchTweetByTag(tag);
    this.observableTweets.subscribe(searchTweets => this.searchTweets = searchTweets);
  }

  // Reload page to update content.
  load() {
    window.location.reload(true);
  }
}
