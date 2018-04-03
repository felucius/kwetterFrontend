
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Account } from '../account/account.component-object';
import { Tweet} from '../account/tweet.component-object';

@Injectable()
export class AccountService {

  constructor (private http: Http) {

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
}
