
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Tweet} from '../account/tweet.component-object';
import { Account } from '../account/account.component-object';
import { DatePipe } from '@angular/common';

@Injectable()
export class TweetService {

  constructor(private http: Http) {

  }

  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  getTweetsFromUser(name: String): Observable<Tweet[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/users/gettweetsfromuser/' + name)
      .map(this.extractData);
  }

  getTweetsFromFollowingUsers(name: String): Observable<Tweet[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/tweets/gettweetsfollowing/' + name)
      .map(this.extractData);
  }

  getTweetLikesFromUser(tweetId: number): Observable<Tweet[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/tweets/gettweetlikes/' + tweetId)
      .map(this.extractData);
  }

  addTweet(tweet: Tweet, account: Account): Observable<Tweet> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // Looking for hashtags
    if (tweet.message.indexOf('#') > 0) {
      const message = tweet.message.substring(tweet.message.indexOf('#'), tweet.message.length);
      tweet.tag = message;
      const replacedMessage = tweet.message.replace(message, ' ');
      tweet.message = replacedMessage;
    }

    // Setting the date to the created tweet.
    const date = new Date();
    tweet.published  = date.toISOString();
    // Setting tweetedby with the account reference.
    tweet.tweetedBy = account;

    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/addtweet/' + account.id, tweet)
      .map(this.extractData);
  }

  getAllTweets(): Observable<Tweet[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/tweets')
      .map(this.extractData);
  }

  editExistingTweet(tweet: Tweet) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/tweets/updatetweet', tweet)
      .map(this.extractData);
  }

  removeExistingTweet(tweet: Tweet) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/removetweet', tweet)
      .map(this.extractData);
  }

  searchTweetByTag(tag: String): Observable<Tweet[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/tweets/findtagbycontent/' + tag)
      .map(this.extractData);
  }
}
