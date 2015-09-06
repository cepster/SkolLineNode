import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class Members{

  constructor(http, router){
    this.http = http;
    this.members = [];
    this.router = router;
    this.selectedMember = undefined;
  }

  activate(){
    return this.http.get("/api/member")
                     .then(response => {
                       this.members = response.content;
                     });
  }

  fillMember(member){
    this.selectedMember = member;
    if(!this.selectedMember.email){
      this.selectedMember.email = "";
    }
    if(!this.selectedMember.name){
      this.selectedMember.name = "";
    }
    if(!this.selectedMember.instrument){
      this.selectedMember.instrument = "";
    }
    if(!this.selectedMember.phoneNumber){
      this.selectedMember.phoneNumber = "";
    }
  }

  loadDetail(id){
    this.http.get('/api/member/' + id)
      .then(response =>{
        this.fillMember(response.content);
      });
  }

  saveMember(){
    if(this.selectedMember._id){
      this.http.put('/api/member/' + this.selectedMember._id, this.selectedMember)
               .then(response => {
                  alert('Saved!');
               });
    }
    else{
      this.http.post('/api/memnber', this.selectedMember)
               .then(response => {
                  alert('Created!');
               });
    }
  }

  deleteMember(){
    this.http.delete('/api/member/' + this.selectedMember._id)
        .then(response => {
          this.router.navigateToRoute('members');
        });
  }
}
