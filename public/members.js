import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class Members{

  constructor(http){
    this.http = http;
    this.members = [];
    this.selectedMember = undefined;
  }

  activate(){
    return this.http.get("/api/member")
                     .then(response => {
                       this.members = response.content;
                     });
  }

  loadDetail(id){
    this.http.get('/api/member/' + id)
      .then(response =>{
          this.selectedMember = response.content;
      });
  }
}
