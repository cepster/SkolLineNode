import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";

@inject(HttpClient)
export class Music {

  constructor(http){
    this.http = http;
    this.music = [];
    this.selectedMusic = undefined;
  }

  activate(params){
    return this.http.get("/api/music")
             .then(response => {
                this.music = response.content;
             });
  }

  loadDetail(id){
    this.http.get("/api/music/" +id)
      .then(response =>{
          this.selectedMusic = response.content;
      });
  }
}
