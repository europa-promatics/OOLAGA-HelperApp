import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable} from "rxjs/Rx"

import { UserProvider } from '../../providers/userProvider'
import {SecurityProvider} from '../../providers/securityProvider'
import { Content, Refresher } from 'ionic-angular'
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment {
  earning:Earning = new Earning();
  history:any;
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  constructor(public userProvider:UserProvider,public securityProvider:SecurityProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.earning.totalEarning=0;
    this.earning.pendingDeposite=0;
    this.earning.sheduledEarnings=0;
	this.history={};
  }
  doRefresh(refresh,value){
      this.loadData(refresh,value)
  }
  loadData(refresh?:any,value?:any){
    //this.history.push({earning:22,name:'a',date:'7-7-7',time:'02:05 AM'},{earning:55,name:'b',date:'7-7-7',time:'02:05 AM'})
    console.log('ionViewDidLoad Payment');
      this.securityProvider.payments(this.userProvider.user.id)
      .subscribe(data=>{
	        console.log(data.earning)
	        // console.log(data.history)
        	// this.history=data.history;
        	this.earning=data.earning;
			this.history=data;
          if(value){
               refresh.complete()
             }
  		},err=>{
        if(value){
               refresh.complete()
             }
  		})
  }
  ionViewDidEnter() {
      this.refresher._top = this.content.contentTop + 'px';
      this.refresher.state = 'ready';
      this.refresher._onEnd();
  }
  getStringValue(string){
	  return  string.replace(/<[^>]*>/g, '');
  }
}
class Earning{
	totalEarning:number;
    pendingDeposite:number;
    sheduledEarnings:number;
    constructor(){
    }
	
}