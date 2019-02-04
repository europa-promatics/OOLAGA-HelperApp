import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ModalController,Events, LoadingController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider} from '../../providers/securityProvider';
import { TranslateService} from '@ngx-translate/core';
import { Observable} from "rxjs/Rx"
import { Content, Refresher } from 'ionic-angular'
import { Myoolaga } from '../myoolaga/myoolaga';

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
  
  openOOlaga(id){
	  if(id){
	  this.securityProvider.getOneOolaga(id)
      .subscribe(data=>{
             if(data){
       let oolaga = this.modalCtrl.create(Myoolaga,{data:data.data[0], flag:1})
      oolaga.onDidDismiss(()=>{
        this.ionViewDidEnter()
      })    
      oolaga.present();
	   
	   console.log(data.data[0]);
             }
      },error=>{
       
      })
	  }else{
		  console.log('id not available');
	  }
  }

  ionViewDidEnter(refresh?:any,value?:any){
      this.refresher._top = this.content.contentTop + 'px';
      this.refresher.state = 'ready';
      this.refresher._onEnd();
  }
  filterString(string){
	  if(string){
	  return string.replace(/<\/?[^>]+(>|$)/g, "");
	  }else{
		  return "";
	  }
  }
  checkHires(message){
	  if(message){
		  if(message.includes('hires')){
			  return true;
		  }else{
			  return false;
		  }
	  }else{
		  return false;
	  }
  }  
  checkSorries(message){
	  if(message){
		  if(message.includes('Sorry')){
			  return true;
		  }else{
			  return false;
		  }
	  }else{
		  return false;
	  }
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
  changeFormat(time){
		if(time){
	  return time.replace(":", "h");
		}else{
			return "Sélectionnez un horaire";
		}
  }
  changeDateFormat(date){
	  var date_parts=date.split('-');
	  return date_parts[0]+'/'+date_parts[1]+'/20'+date_parts[2];
	  //return date.replace(/-/g, "/");
  }
}


