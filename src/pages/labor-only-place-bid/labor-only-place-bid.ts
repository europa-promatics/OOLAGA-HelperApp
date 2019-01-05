import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LaborOnlyPlaceBid page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-labor-only-place-bid',
  templateUrl: 'labor-only-place-bid.html',
})
export class LaborOnlyPlaceBid {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaborOnlyPlaceBid');
  }

}
