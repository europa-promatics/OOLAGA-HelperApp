import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessageOpen }from '../message-open/message-open'

@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class Message {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Message');
  }
  openMessage(){
  	this.navCtrl.push(MessageOpen)
  }

}
