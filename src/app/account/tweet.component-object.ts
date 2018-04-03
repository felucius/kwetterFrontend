
export class Tweet {
  // Fields
  public message: String;
  public published: String;
  public tags: String[];

  constructor(message: String, published: String, tags: String[]) {
    this.message = message;
    this.published = published;
    this.tags = tags;
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
