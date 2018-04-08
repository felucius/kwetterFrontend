
import { Component } from '@angular/core';
import { Account } from './account.component-object';
import { AccountService } from '../service/account.service';
import { Tweet } from './tweet.component-object';
import { TweetService } from '../service/tweet.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [ AccountService, TweetService ]
})

export class AccountComponent {
  title = 'Account page';

  observableAccounts: Observable<Account[]>;
  observableAccount: Observable<Account>;

  accounts: Account[];
  account: Account;

  following: Account[];
  followers: Account[];

  observableTweets: Observable<Tweet[]>;
  observableTweet: Observable<Tweet>;
  tweets: Tweet[];
  tweet: Tweet;

  name: String;

  constructor(private accountService: AccountService, private tweetService: TweetService, private router: Router,
              authenticationService: AuthenticationService) {

    this.name = authenticationService.checklogin();
    if (this.name != null) {
      this.getUser(this.name);
      this.getTweetsFromUser(this.name);
      this.getFollowing(this.name);
      this.getFollowers(this.name);

      if (this.tweet != null) {
        this.editTweet(this.tweet);
      }
    }else {
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

  getUser(name: String) {
    this.observableAccount = this.accountService.getUser(name);
    this.observableAccount.subscribe(account => this.account = account);
  }

  getFollowing(name: String) {
    this.observableAccounts = this.accountService.getFollowing(name);
    this.observableAccounts.subscribe(following => this.following = following);
  }

  getFollowers(name: String) {
    this.observableAccounts = this.accountService.getFollowers(name);
    this.observableAccounts.subscribe(followers => this.followers = followers);
  }

  /*
  Tweet related calls
   */
  getTweetsFromUser(name: String) {
    this.observableTweets = this.tweetService.getTweetsFromUser(name);
    this.observableTweets.subscribe(tweets => this.tweets = tweets);
  }

  // Edit tweet
  editTweet(tweet: Tweet) {
    if (confirm('Edit message: ' + tweet.message)) {
      const retVal = prompt('Enter your name : ', 'your name here');
      tweet.message = retVal;
      this.observableTweet = this.tweetService.editExistingTweet(tweet);
      this.observableTweet.subscribe(editTweet => this.tweet = editTweet);
    } else {
      // Canceled.
    }
  }

  // Remove tweet
  removeTweet(tweet: Tweet) {
    if (confirm('Remove message: ' + tweet.message)) {
      this.observableTweet = this.tweetService.removeExistingTweet(tweet);
      this.observableTweet.subscribe(editTweet => this.tweet = editTweet);
    } else {
      // Canceled.
    }
  }
}
