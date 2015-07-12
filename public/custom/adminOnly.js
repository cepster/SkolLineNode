import {customAttribute, inject} from "aurelia-framework";
import {AuthState} from "../service/authState";
import $ from 'bootstrap';

@customAttribute('admin-only')
@inject(Element, AuthState)
export class AdminOnly {

  constructor(element, authState){
    this.element = element;
    this.authState = authState;
    console.log('adminOnly is being instantiated properly');
  }

  attached(){
    if(!this.authState.isAdmin()){
        $(this.element).hide();
    }
  }
}
