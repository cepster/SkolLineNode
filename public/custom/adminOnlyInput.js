import {customAttribute, inject} from "aurelia-framework";
import {AuthState} from "../service/authState";
import $ from 'bootstrap';

@customAttribute('admin-only-input')
@inject(Element, AuthState)
export class AdminOnly {

  constructor(element, authState){
    this.element = element;
    this.authState = authState;
  }

  attached(){
    if(!this.authState.isAdmin()){
        $(this.element).prop('disabled', 'disabled');
    }
  }
}
