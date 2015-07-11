export class App {
  configureRouter(config, router){
    this.router = router;

    config.title = 'The Minnesota Vikings Skol Line';
    config.map([
      {route: ['', 'home'],       name: 'home',        moduleId:'main'},
      {route: 'music',            name: 'music',       moduleId:'music',   title:'Music',   nav:true},
      {route: 'members',          name: 'members',     moduleId:'members', title:'Members', nav:true},
      {route: 'gigs',             name: 'gigs',        moduleId:'gigs',    title:'Gigs',    nav:true},
      {route: 'gigDetail/:gigID', name: 'gigDetail',   moduleId:'gigDetail'},
    ]);
  }
}
