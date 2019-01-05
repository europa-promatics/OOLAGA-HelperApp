import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import * as js from '../../../www/t.js';
/**
 * Generated class for the Earnings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-earnings',
  templateUrl: 'earnings.html',
})
export class Earnings {
  	@ViewChild('transliterateTextarea') transliterateTextarea;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Earnings');
  }

}
