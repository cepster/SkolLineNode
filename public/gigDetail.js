import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class GigDetail{

  constructor(http){
    this.http = http;
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
