import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";
import {AuthState} from "service/authState";
import _ from "underscore";

@inject(Router, HttpClient, AuthState)
export class Gigs{

  constructor(router, http, authState){
    this.http = http;
    this.router = router;
    this.authState = authState;

    this.gigs = {
      attending:[],
      notGoing:[],
      noResponse:[]
    }
  }

  activate(params){
    return this.http.get('/api/gig')
                    .then(response => {
                        this.setRSVPStatuses(response.content);
                      });
  }

  setRSVPStatuses(allGigs){
    this.gigs.attending = _.filter(allGigs, gig => {
        return _.find(gig.attendees, attendee => {
            return attendee.userID === this.authState.getUserID()
                   && attendee.going;
        });
    });

    this.gigs.notGoing = _.filter(allGigs, gig => {
        return _.find(gig.attendees, attendee => {
            return attendee.userID === this.authState.getUserID()
                   && !attendee.going;
        });
    });

    this.gigs.noResponse = _.filter(allGigs, gig => {
        return _.find(gig.attendees, attendee => {
              return attendee.userID = this.authState.getUserID();
        }) === undefined
    });
  }

  newGig(){
    this.router.navigateToRoute('gigDetail', { gigID: 0 });
  }
}
