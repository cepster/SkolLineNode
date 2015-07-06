import {HttpClient} from "aurelia-http-client";

export class Members{
  constructor(){
    this.http = new HttpClient();
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
