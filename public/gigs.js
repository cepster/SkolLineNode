import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";

@inject(Router, HttpClient)
export class Gigs{

  constructor(router, http){
    this.http = http;
    this.gigs = [];
    this.router = router;
  }

  activate(params){
    return this.http.get('/api/gig')
                    .then(response => {
                        this.gigs = response.content;
                    });
  }

  newGig(){
    this.router.navigateToRoute('gigDetail', { gigID: 0 });
  }
}
