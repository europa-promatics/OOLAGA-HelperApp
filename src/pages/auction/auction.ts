import { Component,ViewChild } from '@angular/core';
import { Content, Refresher } from 'ionic-angular'

import { NavController, NavParams,LoadingController,AlertController,ModalController} from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider} from '../../providers/securityProvider';
import { TranslateService} from '@ngx-translate/core';
import { Observable} from "rxjs/Rx";
import {OfferOpen} from '../offer-open/offer-open'
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-auction',
  templateUrl: 'auction.html',
})
export class Auction {
oolaga
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  constructor(public navCtrl: NavController,
  			  public alertCtrl:AlertController,
  			  public loadingCtrl:LoadingController,
  			  public modalCtrl:ModalController,
              private translateService:TranslateService,
              private securityProvider:SecurityProvider,
              private userProvider:UserProvider,
  			 public navParams: NavParams,
			 private toastCtrl: ToastController) {
  }

  ionViewDidLoad(refresh?:any,value?:any) {
    console.log('ionViewDidLoad Auction');
  }
  doRefresh(refresh,value){
    this.loadData(refresh,value)
  }
  checkDate(data){
    if(data){
      var z=new Date().toISOString().split('T')[0].split('-')[0].slice(2)
      var a=new Date().toISOString().split('T')[0].split('-')[2]+'-'+new Date().toISOString().split('T')[0].split('-')[1]+'-'+z;
      if(data==a){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  loadData(refresh?:any,value?:any){
	  var date = new Date().getDate();
	  var date_month = new Date().getMonth();
	  var date_year = new Date().getFullYear();
	//  alert(date);
	  var final_date=new Date(date_year,date_month,date);
   this.securityProvider.getOolaga(this.userProvider.user.id)
     .subscribe(data =>{
                      if(data.response){
                       this.oolaga=data.oolagas;
                       this.oolaga.reverse() 
					   this.oolaga=this.oolaga.filter(d=>new Date((20+d.date.split('-')[2]),parseInt(d.date.split('-')[1])-1, d.date.split('-')[0]).getTime() >=final_date.getTime());
                       this.oolaga = this.oolaga.map(function(el) {
						   
						      var time=el.first_time; 
							  console.log(el);
							  var date_string=20+el.date.split('-')[2]+"-"+(String(el.date.split('-')[1]).padStart(2,"0"))+"-"+String(el.date.split('-')[0]).padStart(2,"0")+'T'+time;						 
							 var date1=new Date(date_string);
							 var date2=new Date();
							 console.log('Difference');
							 console.log(date1);
							 console.log(date2);
							var difference =(date1.getTime() - date2.getTime()) / 1000;
							difference /= (60 * 60);
							console.log(difference);
							
							  var o = Object.assign({}, el);
							  o.remaining_time=difference;
							  return o; 
							}) 
					  }
                      else{
                        this.oolaga=[]
                      }
                       if(value){
                         refresh.complete();
                       }
                    }),
               error=>{
                       if(value){
                         refresh.complete();
                       }
                      let alert=this.alertCtrl.create({
                        title:'Timeout',
                        buttons:['Ok']
                      })
                      alert.present()
    }
  }


  ionViewDidEnter(){
      this.refresher._top = this.content.contentTop + 'px';
      this.refresher.state = 'ready';
      this.refresher._onEnd();
  }
  openOffer(value, time){
	  if(time<1){
		  this.presentToast();
		  return false;
	  }else{
		
      let msg = this.modalCtrl.create(OfferOpen,{oolaga:value})
      msg.present();
      msg.onDidDismiss(data=>{
        this.ionViewDidEnter();
      })
	  }
  } 
  
  getLastName(name){
	  return name.charAt(0);
  }
  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'The OOLAGA has been expired!',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
getStringValue(string){
	  return  string.replace(/<[^>]*>/g, '');
  }
  changeFormat(time){
	  return time.replace(":", "h");
  }
  changeDateFormat(date){
	  var date_parts=date.split('-');
	  return date_parts[0]+'/'+date_parts[1]+'/20'+date_parts[2];
	  //return date.replace(/-/g, "/");
  }
}
