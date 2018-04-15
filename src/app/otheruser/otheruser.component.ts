import {Component} from '@angular/core';
import {Account} from '../account/account.component-object';
import {Observable} from 'rxjs/Observable';
import {AccountService} from '../service/account.service';
import {Router} from '@angular/router';
import {Tweet} from '../account/tweet.component-object';
import {TweetService} from '../service/tweet.service';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  templateUrl: './otheruser.component.html',
  styleUrls: ['./otheruser.component.css'],
  providers: [AccountService, TweetService, AuthenticationService]
})

export class OtheruserComponent {
  title = 'Account page';

  otherAccount: Account;
  observableOtherAccount: Observable<Account>;
  following: Account[];
  followers: Account[];
  observableAccounts: Observable<Account[]>;
  observableTweets: Observable<Tweet[]>;
  observableTweet: Observable<Tweet>;
  observableLikes: Observable<Account[]>;
  tweets: Tweet[];
  tweet: Tweet;
  likedTweet: Tweet;
  tweetLikes: Account[];

  observableFollowing: Observable<Boolean>;
  follower: Boolean;

  name: String;
  checkLoggedInUser: String;

  constructor(private accountService: AccountService, private router: Router, private tweetService: TweetService,
              private authenticationService: AuthenticationService) {
    this.name = localStorage.getItem('otherUser');
    if (name != null) {
      this.checkLoggedInUser = this.authenticationService.checklogin();
      if (this.checkLoggedInUser !== this.name) {
        this.getUser(this.name);
        this.getTweetsFromUser(this.name);
        this.getFollowing(this.name);
        this.getFollowers(this.name);
      } else {
        this.router.navigate(['./profile']);
      }

    }
  }

  getUser(name: String) {
    this.observableOtherAccount = this.accountService.getUser(name);
    this.observableOtherAccount.subscribe(account => this.otherAccount = account);
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

  followUser(userName: String, userFollowing: String) {
    this.observableFollowing = this.accountService.followUser(userName, userFollowing);
    this.observableFollowing.subscribe(follower => this.follower = follower);
  }

  unFollowUser(userName: String, userUnfollowing: String) {
    this.observableFollowing = this.accountService.unFollowUser(userName, userUnfollowing);
    this.observableFollowing.subscribe(follower => this.follower = follower);
  }

  likeTweet(user: Account, tweetId: number) {
    this.observableTweet = this.tweetService.likeTweet(user, tweetId);
    this.observableTweet.subscribe(tweetToLike => this.tweet = tweetToLike);
  }

  getTweetLikes(tweetId: number) {
    this.observableLikes = this.tweetService.getTweetLikes(tweetId);
    this.observableLikes.subscribe(getLikes => this.tweetLikes = getLikes);
  }

  visitUser(name: String) {

    if (name != null) {
      localStorage.setItem('otherUser', name.toString());
      this.router.navigate(['/otheruser']);
      this.load();
    }
  }

  // Reload page to update content.
  load() {
    window.location.reload(true);
  }
}
