
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, ResponseOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Account} from '../account/account.component-object';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AuthenticationService {
  public token: string;
  public user: Account;
  response: Response;
  body: String;
  name: String;
  generatedToken;
  private loggedIn: String;//Subject<boolean> = new Subject<boolean>();

  // make isLoggedIn public readonly
  get isLoggedIn() {
    this.loggedIn = localStorage.getItem('currentUser');
    return this.loggedIn;
  }

  constructor(private http: Http) {
    // set token if saved in local storage
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.token = currentUser && currentUser.token;
    //this.loggedIn.next(!!localStorage.getItem('currentUser'));
    this.loggedIn = localStorage.getItem('currentUser');
  }

  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  public extractToken(res: Response) {
      // login successful if there's a jwt token in the response
      const token = res.text();
      if (token != null) {
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify({ token: token }));
        // return true to indicate successful login
        return token;
      } else {
        // return false to indicate failed login
        return null;
      }
  }

  checklogin(): String {
    const token = localStorage.getItem('currentUser');

    if (token != null) {
      const tokenPayload = jwt_decode(token);
      this.name = tokenPayload.sub;
      return this.name;
    }else {
      return null;
    }
  }

  login(name: string, password: string): Observable<Account> {
    this.user = new Account(name, null, null, null, password, null, null);
    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/login', this.user)
      .map((response: Response) => {
        this.user = response.json();
        if (this.user != null) {
          //localStorage.setItem('currentUser', JSON.stringify({ name: name}));
          return this.user;
        }else {
          return null;
        }
      });
  }

  generateToken(user: Account): Observable<String> {
    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/authentication/generatetoken', user)
      .map(this.extractToken);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    console.log('Token before remove: ' + localStorage.getItem('currentUser'));
    this.token = null;
    localStorage.removeItem('currentUser');
    console.log('Token after remove: ' + localStorage.getItem('currentUser'));
  }
}
