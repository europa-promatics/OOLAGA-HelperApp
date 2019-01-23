import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,AlertController,MenuController } from 'ionic-angular';
import { UserProvider }from '../../providers/userProvider'
import { SecurityProvider } from '../../providers/securityProvider'
import {TranslateService} from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { Observable} from "rxjs/Rx";
import { FCM } from '@ionic-native/fcm';
import { ForgotPassword }from '../forget_password/forget_password';

import { Tabs } from '../tabs/tabs'
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
uuid
platform
user
pass
tok
push
debug:boolean=false;
menu
user_id
  constructor(public device:Device,
              public fcm:FCM,
              public menuCtrl:MenuController,
              public loadingCtrl:LoadingController,
              public alertCtrl:AlertController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private securityProvider:SecurityProvider,
              private translateService: TranslateService) 
  {
    this.menu=menuCtrl;
    this.menu.enable(false,"mymenu");
    
  }

  ionViewWillLoad() {
    localStorage.clear();
    //--------------------mobile code----------------------
      this.uuid=this.device.uuid
      this.platform=this.device.platform
      this.fcm.getToken().then(token=>{
          console.log('Token saved:', token);
          this.tok=token;
          localStorage['token']=this.tok
      })
    //-----------------------------------------------------
    console.log('ionViewDidLoad Login');
  }
  
  login(){
    //---------------------browser code--------------------
     // this.platform='Browser';
     // this.uuid='5546464656546546'
     // localStorage['token']='sfsfhskfhksdhfjkhfksdfgvsdffhguyegey87ye837mccnk,'
    //------------------------------------------------------
    	let loading = this.loadingCtrl.create();
    	Observable.of(loading).flatMap(loading => loading.present())
      .flatMap(() => this.securityProvider.login(this.user,this.pass,this.uuid,this.platform))
        .subscribe(data=>{
        	loading.dismiss();
        	if(data.response==true){
      			localStorage['login']=true;
      			localStorage['userdata']=JSON.stringify(data.user_info);
            this.menu.enable(true,"mymenu");
            this.navCtrl.setRoot(Tabs);
        	}else{
      			localStorage['login']=false;
      			this.user='';
      			this.pass='';
      			let alert=this.alertCtrl.create({
      				title:	"Oups",
      				message: "Données invalides",
      				buttons:[this.translateService.instant('action.ok')]
      			})
      			alert.present();
        	}
        	console.log(data);
        })
    // let alert = this.alertCtrl.create({
    //   title:'check',
    //   message:'phone_id:'+this.uuid+',platform:'+this.platform+',password:'+this.pass+',username:'+this.user+',push_token:'+localStorage['token'],
    //   buttons:[{text:'ok', handler:()=>{
    //     }}]
    // })
    // alert.present();
  }

  forgotPass(){
     this.navCtrl.push(ForgotPassword)
  }

}
