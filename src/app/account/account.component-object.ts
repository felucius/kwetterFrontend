
export class AccountComponentObject {
  // Fields
  public name: String;
  public email: String;
  public bio: String;
  public location: String;
  public password: String;
  public picture: String;
  public website: String;

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

  getUsername() {
    return this.name;
  }

  setUsername(username: String) {
    this.name = username;
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
