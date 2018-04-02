
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {AccountComponentObject} from '../account/account.component-object';

@Injectable()
export class AccountService {

  constructor (private http: Http) {

  }

  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  getUsers(): Observable<AccountComponentObject[]> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/users/')
      .map(this.extractData);
  }

  getUser(id: number): Observable<AccountComponentObject> {
    return this.http.get('http://localhost:8080/KwetterBackend_Maxime/api/users/finduser/' + id)
      .map(this.extractData);
  }
}
