import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,IonicPage ,LoadingController} from 'ionic-angular';
import { ENV } from '../../app/env'
import { Http } from '@angular/http';
import { Tabs } from '../tabs/tabs';
import { SecurityProvider } from '../../providers/securityProvider'
import { Observable} from "rxjs/Rx";


/**
 * Generated class for the Feedback page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  star1:number=0;
  star2:number=0;
  star3:number=0;
  helper_id
  oolaga_id
  customer_id
  http
  customer_image
  total
  customer_name
  constructor(public alertCtrl:AlertController,public navCtrl: NavController, http:Http, public navParams: NavParams, private loadingCtrl:LoadingController,private securityProvider: SecurityProvider) {
	 // console.log(this.navParams);
	  this.http = http;
	  this.helper_id=this.navParams.get('helper_id');
	  this.oolaga_id=this.navParams.get('oolaga_id');
	  this.customer_id=this.navParams.get('customer_id');
	  this.customer_name=this.navParams.get('customer_name');
	  var image=this.navParams.get('customer_image');
	  if(!image){
		  image="public/frontend/img/profile/pro.png"; 
	  }
	  this.customer_image="http://18.188.229.2/oolaga/"+image;
	  this.total=this.navParams.get('total_oolagas');
	 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Feedback');
  }

  
  submit(){
	        var data=JSON.stringify({
              courtesy:this.star1,
              timeliness:this.star2,
              accuracy:this.star3,
              oolaga_id:this.oolaga_id,
              customer_id:this.customer_id,
              helper_id:localStorage['user_id']
            })
      console.log(data)
	     let loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(loading => loading.present())
        .flatMap(() => this.securityProvider.CustomerReview(this.star1,this.star2,this.star3,this.oolaga_id, this.customer_id, this.helper_id))
        .subscribe(data=>{
          console.log(data.response);
          loading.dismiss();
          if(data.response ==true){
            let alert=this.alertCtrl.create({
                title:'Merci',
                message:"Merci d'avoir partagé votre avis!",
                buttons:['Ok']
              })
              alert.present();
			  this.navCtrl.setRoot(Tabs);
          }
          else if(data.response ==false){
            let alert=this.alertCtrl.create({
                title:'Pardon',
                message:"Entrez tous les champs" ,
                buttons:['Ok']
              })
              alert.present();
          }
      })
  }
}
