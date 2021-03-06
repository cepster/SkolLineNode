import {inject} from "aurelia-framework";
import {AuthState} from'./service/authState';

@inject(AuthState)
export class App {

  constructor(authState){
    this.authState = authState;
  }

  configureRouter(config, router){
    this.router = router;

    config.title = 'The Minnesota Vikings Skol Line';
    config.map([
      {route: ['', 'home'],           name: 'home',        moduleId:'main',     title:'Home',    nav:true},
      {route: 'music',                name: 'music',       moduleId:'music',    title:'Music',   nav:true},
      {route: 'musicDetail/:musicID', name: 'musicDetail', moduleId:'musicDetail'},
      {route: 'members',              name: 'members',     moduleId:'members',  title:'Members', nav:true},
      {route: 'gigs',                 name: 'gigs',        moduleId:'gigs',     title:'Gigs',    nav:true},
      {route: 'gigDetail/:gigID',     name: 'gigDetail',   moduleId:'gigDetail'},
      {route: 'calendar',             name: 'calendar',    moduleId:'calendar', title:'Calendar', nav:true},
      {route: 'social',               name: 'social',      moduleId:'social',   title:'Social',   nav:true},
      {route: 'forum',                name: 'forum',       moduleId:'forum',    title:'Forum',    nav:true}
    ]);
  }

  activate(){
    this.authState.initialize();
  }

  loggedInName(){
    return this.authState.getUserName();
  }
}
