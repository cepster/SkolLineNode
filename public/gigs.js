import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";
import {AuthState} from "service/authState";
import _ from "underscore";

var getRsvpUrl = function(gigID, userID){
  return 'api/gig/' + gigID + '/attendee/' + userID;
};

@inject(Router, HttpClient, AuthState)
export class Gigs{

  constructor(router, http, authState){
    this.http = http;
    this.router = router;
    this.authState = authState;

    this.gigs = [];
  }

  activate(){
    return this.loadGigs();
  }

  loadGigs(){
    return this.http.get('/api/gig')
                    .then(response => {
                        this.setRSVPStatuses(response.content);
                      });
  }

  setRSVPStatuses(allGigs){
    var goingList = _.filter(allGigs, gig => {
        return _.find(gig.attendees, attendee => {
            return attendee.userID === this.authState.getUserID()
                   && attendee.going;
        });
    });

    var notGoingList = _.filter(allGigs, gig => {
        return _.find(gig.attendees, attendee => {
            return attendee.userID === this.authState.getUserID()
                   && !attendee.going;
        });
    });

    var noResponseList = _.filter(allGigs, gig => {
        return _.find(gig.attendees, attendee => {
              return attendee.userID === this.authState.getUserID();
        }) === undefined;
    });

    this.gigs = [
      {
        title: 'No Response',
        list: noResponseList,
        needRsvp: true
      },
      {
        title: 'Going',
        list: goingList,
        needRsvp: false,
      },
      {
        title: 'Not Going',
        list: notGoingList,
        needRsvp: false
      }
    ];
  }

  newGig(){
    this.router.navigateToRoute('gigDetail', { gigID: 0 });
  }

  rsvp(gigID, status){
    var payload = {going:status};

    return this.http.post(getRsvpUrl(gigID, this.authState.getUserID()), payload)
                    .then(response => {
                      this.loadGigs();
                    });
  }

  removeRsvp(gigID){
    return this.http.delete(getRsvpUrl(gigID, this.authState.getUserID()))
                    .then(response => {
                      console.log(response);
                      this.loadGigs();
                    });
  }
}
