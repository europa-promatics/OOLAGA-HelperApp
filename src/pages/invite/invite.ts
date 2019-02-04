import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class Invite {

  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Invite');
  }
  share(value){
    if(value==1){
    this.socialSharing.shareViaFacebook('https://ionicframework.com/docs/native/social-sharing')
    .then(() => {
    }).catch(() => {
      alert("Partager via fb n'est pas possible")
      // 
    });
    }
    if (value==2){
    this.socialSharing.shareViaTwitter('https://ionicframework.com/docs/native/social-sharing')
    .then(() => {
    }).catch(() => {
      alert("Partager via fb n'est pas possible")
    });
    }  	
    if (value==4){
    this.socialSharing.shareViaWhatsApp('https://ionicframework.com/docs/native/social-sharing')
    .then(() => {
    }).catch(() => {
      alert("Partager via fb n'est pas possible")
    });
    }    
    if (value==3){
    this.socialSharing.canShareVia('https://ionicframework.com/docs/native/social-sharing')
    .then(() => {
    }).catch(() => {
      alert("Partager via fb n'est pas possible")
    });
    }  
  }
}
