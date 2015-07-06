import {HttpClient} from "aurelia-http-client";

export class Members{
  constructor(){
    this.http = new HttpClient();
    this.members = [];
  }

  activate(){
    return this.http.get("/api/member")
                     .then(response => {
                       this.members = response.content;
                     });
  }
}
