
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Account } from '../account/account.component-object';
import {Router} from '@angular/router';

@Injectable()
export class AccountService {

  constructor (private http: Http, private router: Router) {

  }

  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  getUsers(): Observable<Account[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/users/')
      .map(this.extractData);
  }

  getUser(name: String): Observable<Account> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/users/finduserbyname/' + name)
      .map(this.extractData);
  }

  getFollowing(name: String): Observable<Account[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/users/getfollowing/' + name)
      .map(this.extractData);
  }

  getFollowers(name: String): Observable<Account[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/users/getfollowers/' + name)
      .map(this.extractData);
  }

  getTweetMentions(tweetId: number): Observable<Account[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/tweets/gettweetmentions/' + tweetId)
      .map(this.extractData);
  }

  // Add user
  create(user: Account): Observable<Account> {
    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/createuser', user)
      .map(this.extractData);
  }

  editUser(user: Account): Observable<Account> {
    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/updateuser', user)
      .map(this.extractData);
  }

  followUser(username, userFollowing): Observable<Boolean> {
    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/followuser/' + username + '/' + userFollowing, username + '/' + userFollowing)
      .map(this.extractData);
  }

  unFollowUser(username, userUnfollowing): Observable<Boolean> {
    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/unfollowuser/' + username + '/' + userUnfollowing, username + '/' + userUnfollowing)
      .map(this.extractData);
  }
}
