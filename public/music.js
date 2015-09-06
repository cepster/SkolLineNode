import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-http-client";
import {Router} from "aurelia-router";

@inject(HttpClient, Router)
export class Music {

  constructor(http, router){
    this.http = http;
    this.router = router;
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

  newMusic(){
    this.router.navigateToRoute('musicDetail', { musicID: 0 });
  }
}
