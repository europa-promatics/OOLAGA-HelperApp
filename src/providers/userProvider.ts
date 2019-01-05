import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
@Injectable()
export class UserProvider {
	user:User;
  spinner:boolean=true;
  constructor(public http: Http) {
	this.user = new User();    
  }
  createNew(){
	this.user = new User();
    console.log('New Data!');
  }
  consoleData(){
  	console.log(this.user)
  }

}
