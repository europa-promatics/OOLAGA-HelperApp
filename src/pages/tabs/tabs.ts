import { Component } from '@angular/core';
import {Home} from '../home/home';
import {Auction} from '../auction/auction'
import {Notification} from '../notification/notification';
import { MenuController,Events, NavParams } from 'ionic-angular';
import { Earnings } from '../earnings/earnings' 
import { UserProvider } from '../../providers/userProvider';
import { Payment } from '../payment/payment'
import { Statistics} from '../statistics/statistics'
import { Observable} from "rxjs/Rx";
import { SecurityProvider}from '../../providers/securityProvider';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {
  tab1Root = Home;
  tab2Root = Auction;
  tab3Root = Notification;
  tab4Root = Statistics;
  tab5Root = Home;
  index
  noti:number=null;
  constructor(public securityProvider:SecurityProvider,public events:Events,public userProvider:UserProvider,public menuCtrl:MenuController, public navParams: NavParams) {
	  this.index=this.navParams.get('index');
	  if(!this.index){
		  this.index=0
	  }
	  //alert(this.index);
    this.events.subscribe('notification',(data)=> {
      // this.noti++;
    });
    this.notifications();
  }
  openNoti(){
    this.noti=null;
  }
  openMenu(){
    this.menuCtrl.open()
  }
  ionViewDidEnter(){
    setInterval(()=>{
      // this.noti++;
      this.notifications()
    },30000)
  }
  notifications(){
    this.securityProvider.checkNotifications(this.userProvider.user.id)
    .subscribe(data=>{
      data.unread==0?this.noti=null:this.noti=data.unread;
    })
  }
}