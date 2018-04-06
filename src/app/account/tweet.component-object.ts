
export class Tweet {
  // Fields
  public id: number;
  public message: String;
  public published: String;
  public tags: String[];
  public likes: Account[];
  public tweetedBy: Account;

  constructor(message: String, published: String, tags: String[]) {
    this.message = message;
    this.published = published;
    this.tags = tags;
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

  setTags(tags: String[]) {
    this.tags = tags;
  }

  getTags() {
    return this.tags;
  }
}
