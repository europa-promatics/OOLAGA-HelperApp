import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class Alert {
	price;
  myolaga;
  option;
  locations;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams,public modalCtrl: ModalController,private alertCtrl:AlertController,private loadingCtrl:LoadingController) {
    this.myolaga=this.navParams.get('olaga');
    this.option=this.navParams.get('alert');
    this.locations=this.navParams.get('locations');
    console.log(JSON.stringify(this.myolaga))
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Alert');
  }
  cancel(){
    this.viewCtrl.dismiss(false);
  }
  startOolaga(value){
    this.viewCtrl.dismiss(value);
  }
  submit(){
    if(parseInt(this.price)>=25){
    		this.viewCtrl.dismiss(this.price); 
    }
    else{
      let alert=this.alertCtrl.create({
        title:'oops..',
        subTitle:' Veuillez saisir une offre d’un minimum de 25 €',
        buttons:['Ok']
      })
      alert.present()
    }
  }
}