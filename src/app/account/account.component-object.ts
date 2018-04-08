
import {Tweet} from './tweet.component-object';

export class Account {
  // Fields
  public id: number;
  public name: String;
  public email: String;
  public bio: String;
  public location: String;
  public password: String;
  public picture: String;
  public website: String;
  public tweets: Tweet[];

  constructor(name: String, email: String, bio: String, location: String, password: String,
              picture: String, website: String) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.location = location;
    this.password = password;
    this.picture = picture;
    this.website = website;
  }

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setTweets(tweets: Tweet[]) {
    this.tweets = tweets;
  }

  getTweets() {
    return this.tweets;
  }

  getUsername() {
    return this.name;
  }

  setUsername(name: String) {
    this.name = name;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email: String) {
    this.email = email;
  }

  setBio(bio: String) {
    this.bio = bio;
  }

  getBio() {
    return this.bio;
  }

  setLocation(location: String) {
    this.location = location;
  }

  getLocation() {
    return this.location;
  }

  setPassword(password: String) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }

  setPicture(picture: String) {
    this.picture = picture;
  }

  getPicture() {
    return this.picture;
  }

  setWebsite(website: String) {
    this.website = website;
  }

  getWebsite() {
    return this.website;
  }
}
