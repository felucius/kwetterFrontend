
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import

@Injectable()
export class TweetService {

  constructor(http: Http) {

  }

  public extractData(res: Response) {
    const body = res.json();
    return body;
  }


}
