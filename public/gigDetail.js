import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {AuthState} from "./service/authState";

@inject(HttpClient, AuthState)
export class GigDetail{

  constructor(http, authState){
    this.http = http;
    this.authState = authState;
    this.gig = undefined;
  }

  activate(params){
    if(params.gigID !== "0"){
      return this.http.get("/api/gig/" + params.gigID)
                      .then(response => {
                          this.gig = response.content;
                      });
    }
  }

  saveGig(){
    this.http.post('/api/gig', this.gig)
             .then(response => {
               alert('Successful!');
             })
  }
}
