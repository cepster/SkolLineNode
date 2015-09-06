import {customAttribute, inject, bindable} from "aurelia-framework";
import {Router} from "aurelia-router";
import $ from 'jquery';

@customAttribute('button-navigate')
@inject(Element, Router)
export class ButtonNavigate {

  @bindable href;
  @bindable routehref;

  constructor(element, router){
    this.element = element;
    this.router = router;
  }

  bind(){
    $(this.element).click(() =>{
      if(this.href){
        location.href(this.href);
      }
      else if(this.routehref){
        this.router.navigateToRoute(this.routehref);
      }
    });
  }
}
