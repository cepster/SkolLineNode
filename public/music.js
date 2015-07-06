import {HttpClient} from "aurelia-http-client";

export class Music {
  constructor(){
    this.http = new HttpClient();
    this.music = [];
    this.selectedMusic = undefined;
  }

  activate(params){

    return this.http.get("/api/music")
             .then(response =>{
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
