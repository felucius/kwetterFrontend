
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, ResponseOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Account} from '../account/account.component-object';

@Injectable()
export class AuthenticationService {
  public token: string;
  public user: Account;
  response: Response;

  constructor(private http: Http) {
    // set token if saved in local storage
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.token = currentUser && currentUser.token;
  }

  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  login(name: string, password: string): Observable<Boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    this.user = new Account(name, null, null, null, password, null, null);
    return this.http.post('http://localhost:8080/KwetterBackend_Maxime/api/users/login', this.user)
      .map((response: Response) => {

          // check user credentials and return fake jwt token if valid
          this.response = (new Response(
            new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
          ));

        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (!token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ name: name, token: token }));
          console.log('GEN token: ' + localStorage.getItem('currentUser'));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
