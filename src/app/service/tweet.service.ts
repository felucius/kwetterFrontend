
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Tweet} from '../account/tweet.component-object';

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
}
