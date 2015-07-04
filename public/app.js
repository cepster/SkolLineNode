export class App {
  configureRouter(config, router){
    this.router = router;

    config.title = 'The Minnesota Vikings Skol Line';
    config.map([
      {route: ['', 'home'], name: 'home',    moduleId:'main'},
      {route: 'music',      name: 'music',   moduleId:'music'},
      {route: 'members',    name: 'members', moduleId:'members'}
    ]);
  }
}
