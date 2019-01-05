import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { Login } from '../login/login'
/**
 * Generated class for the Start page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class Start {
	menu
  constructor(public navCtrl: NavController,public menuCtrl:MenuController, public navParams: NavParams) {
    this.menu=menuCtrl;
    this.menu.enable(false,"mymenu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Start');
  }
  login(){
  	this.navCtrl.push(Login);
  }
}
