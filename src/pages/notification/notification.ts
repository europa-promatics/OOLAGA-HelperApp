import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ModalController,Events, LoadingController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider} from '../../providers/securityProvider';
import { TranslateService} from '@ngx-translate/core';
import { Observable} from "rxjs/Rx"
import { Content, Refresher } from 'ionic-angular'

import { NotificationOpen } from '../notification-open/notification-open'
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class Notification {
  test=[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2]
  data
  notification;
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  constructor(public modalCtrl:ModalController,
              private alertCtrl:AlertController,private loadingCtrl:LoadingController,
              private translateService:TranslateService,
              private securityProvider:SecurityProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider:UserProvider,) 
  { 
    this.notification=[];
  }
  doRefresh(refresh,value){
      this.loadData(refresh,value)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Notification');
  }
  loadData(refresh?:any,value?:any){
      this.securityProvider.notification(this.userProvider.user.id)
      .subscribe(data=>{
            this.notification=data.data
            this.notification.reverse()
             if(value){
               refresh.complete()
             }
      },error=>{
        if(value){
          refresh.complete()
        }
      })
  }
  openNotification(m,a){
     let  notification = this.modalCtrl.create(NotificationOpen,{notydata:m});
          notification.onDidDismiss(data => {
            this.ionViewDidEnter()
          });
          //notification.present();

  }

  ionViewDidEnter(refresh?:any,value?:any){
      this.refresher._top = this.content.contentTop + 'px';
      this.refresher.state = 'ready';
      this.refresher._onEnd();
  }
  delete(index,item){
    console.log(item)
    item.close();
    setTimeout(()=>{
      this.notification.splice(index, 1);
    },300)
    this.securityProvider.deleteNotification(this.notification[index].id).subscribe(data=>{
      if(data.response){

      }
    },err=>{

    })
  }
}


