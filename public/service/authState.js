import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class AuthState {
  constructor(http){
    this.http = http;
    this.user = {};
  }

  initialize(){
    this.http.get('/api/me')
             .then(response => {
               this.user = response.content;
             });
  }

  setUser(u){
    this.user = u;
  }

  getUserID(){
    return this.user.userID;
  }

  getUserName(){
    return this.user.name;
  }

  isAdmin(){
    return this.user.admin;
  }
}
