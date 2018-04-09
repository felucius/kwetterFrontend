
import {Account} from './account.component-object';

export class Tweet {
  // Fields
  public id: number;
  public message: String;
  public published: String;
  public tag: String;
  public likes: Account[];
  public tweetedBy: Account;

  constructor(message: String, published: String, tag: String) {
    this.message = message;
    this.published = published;
    this.tag = tag;
  }

  setTweetedBy(tweetedBy: Account) {
    this.tweetedBy = tweetedBy;
  }

  getTweetedBy() {
    return this.tweetedBy;
  }

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setLike(likes: Account[]) {
    this.likes = likes;
  }

  getLike() {
    return this.likes;
  }

  setMessage(message: String) {
    this.message = message;
  }

  getMessage() {
    return this.message;
  }

  setPublished(published: String) {
    this.published = published;
  }

  getPublished() {
    return this.published;
  }

  setTags(tag: String) {
    this.tag = tag;
  }

  getTags() {
    return this.tag;
  }
}
