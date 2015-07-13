import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {AuthState} from "./service/authState";
import {Router} from "aurelia-router";

@inject(HttpClient, AuthState, Router)
export class GigDetail{

  constructor(http, authState, router){
    this.http = http;
    this.authState = authState;
    this.router = router;
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
    if(this.gig._id){
      this.http.put('/api/gig/' + this.gig._id, this.gig)
               .then(response => {
                  this.router.navigateToRoute('gigs');
               });
    }
    else{
      this.http.post('/api/gig', this.gig)
               .then(response => {
                 this.router.navigateToRoute('gigs');
               });
    }
  }

  deleteGig(){
    if(this.gig._id){
      console.log('Deleting...');
      this.http.delete('/api/gig/' + this.gig._id)
               .then(response => {
                  this.router.navigateToRoute('gigs');
               });
    }
  }
}
