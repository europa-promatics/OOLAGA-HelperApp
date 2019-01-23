import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ModalController,LoadingController } from 'ionic-angular';
import { Alert } from '../alert/alert'
import { Map } from '../map/map';
import { MessageOpen } from '../message-open/message-open'
import { ENV } from "../../app/env";
import { Observable} from "rxjs/Rx";
import { TranslateService} from '@ngx-translate/core';
import { SecurityProvider}   from '../../providers/securityProvider';
import { Canceloolaga } from '../canceloolaga/canceloolaga';
import { Device }from '@ionic-native/device'
import { OpenItemPic } from '../open-item-pic/open-item-pic';
import { FeedbackPage } from '../feedback/feedback';
@Component({
  selector: 'page-myoolaga',
  templateUrl: 'myoolaga.html',
})
export class Myoolaga {
  my:any;
  customer_image
  rating=1
  total_oolagas
  flag
  backButton=0
  oolaga;
  startOolagaButton:boolean=false;
  endOolagaButton:boolean=false;
  confirmPickupButton1:boolean=false;
  confirmPickupButton2:boolean=false;
  confirmPickupButton3:boolean=false;
  completeOolaga:boolean=false;
  locations
  startTime;
  customer_name
  currentTime;
  selected_item=0;
  start_enable:boolean=false;
  a
  feedbackStyle={float: "left", "background-color":"gray"};
  constructor(public device:Device,
      private securityProvider:SecurityProvider,
      private translateService:TranslateService,
      public loadingCtrl:LoadingController,
      public modalCtrl:ModalController,
      public alertCtrl:AlertController,
      public navCtrl: NavController, 
      public navParams: NavParams) {
		  
	  }

  checkstart(){
    this.currentTime = Date.parse(new Date().toString());
    if(this.startTime - this.currentTime < 1000*60*60 && (this.startTime+1800000) > this.currentTime){
      console.log(this.startTime)
      console.log(this.currentTime)
      console.log((this.startTime+1800000) > this.currentTime)
      console.log(this.startTime - this.currentTime)
      console.log(this.startTime - this.currentTime < 1000*60*60)
      this.start_enable=true;
    }else{
      setTimeout(()=>{this.checkstart()},15000)
      console.log(this.startTime - this.currentTime < 1000*60*60)
    }
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad Myoolaga');
    this.oolaga=this.navParams.get('data');
	//alert(this.oolaga.user.lastname);
	this.flag=this.navParams.get('flag');
	if(this.navParams.get('backButton')){
		this.backButton=this.navParams.get('backButton');
	}
	//alert(JSON.stringify(this.oolaga));
    let timer=this.oolaga.date
    timer=timer.split('-')[0]+'-'+timer.split('-')[1]+'-20'+timer.split('-')[2]
    this.startTime = timer.split('-').reverse().toString().replace(',','-').replace(',','-')+'T'+this.oolaga.first_time+':00.000Z';
    this.startTime = Date.parse(this.startTime.replace('T',' ').replace('.000Z',''))
    this.currentTime = Date.parse(new Date().toString());
    this.my=ENV.mainApi
    if(this.oolaga.way_point1==null && this.oolaga.way_point2==null){
      this.locations=2;
    }
    else if(this.oolaga.way_point1!=null && this.oolaga.way_point2==null){
      this.locations=3;
    }
    else if(this.oolaga.way_point1!=null && this.oolaga.way_point2!=null){
      this.locations=4;
    }
    this.checkstart();
	
	this.getInfo();
  }

  openPic(pic){
    pic=this.my+'/public/frontend/img/addImage/'+pic;
    let model = this.modalCtrl.create(OpenItemPic,{pic:pic})
    model.present()
  }

  submit(){
    let loading = this.loadingCtrl.create();
    Observable.of(loading).flatMap(loading => loading.present())
     .flatMap(data => this.securityProvider.trackOollaga(this.oolaga.id))
     .subscribe(data =>loading.dismiss().then(() =>{
           console.log(data);
           if(data.response){
             this.oolaga.track_status=data.message
             if(data.message=='end_oolaga'){
               //this.navCtrl.pop();
			    this.navCtrl.push(FeedbackPage, {oolaga_id:this.oolaga.id, customer_id:this.oolaga.customer_id, helper_id:this.oolaga.helper_id, customer_image: this.customer_image, total_oolagas: this.total_oolagas, customer_name: this.customer_name});
             }
           }else{
           }
        }),
       error=>{    
           console.log(error);
      })
  }

  leaveFeedback(){
	    this.navCtrl.push(FeedbackPage, {oolaga_id:this.oolaga.id, customer_id:this.oolaga.customer_id, helper_id:this.oolaga.helper_id, customer_image: this.customer_image, total_oolagas: this.total_oolagas, customer_name: this.customer_name});
  }
  
   getInfo(){
    let loading = this.loadingCtrl.create();
    Observable.of(loading).flatMap(loading => loading.present())
     .flatMap(data => this.securityProvider.getInfo(this.oolaga.helper_id, this.oolaga.customer_id, this.oolaga.id))
     .subscribe(data =>loading.dismiss().then(() =>{
           console.log(data);
           if(data.response){
             this.total_oolagas=data.total_oolagas;
			 this.customer_image=data.customer_image;
			 this.customer_name=data.customer_name;
			 this.rating=data.rating;
		//	 alert(data.rating);
             if(data.rating==0){
				 this.feedbackStyle={float: "left", "background-color":"#3DADF5"};
			 }else{
			 this.feedbackStyle={float: "left", "background-color":"gray"};
			 }
           }else{
           }
        }),
       error=>{    
           console.log(error);
      })
  }
  help(){
    let alert = this.alertCtrl.create({
      message:'Cette page est un récapitulatif de votre projet que vous vous êtes engagés à réaliser. Appuyez sur "Démarrer" pour débuter votre projet. Vous pouvez également rapidement le géolocaliser et discuter avec votre client à travers l’outil de messagerie en appuyant sur les icônes en bas de la page',
      buttons:[{text:'OK'}]
    })
    alert.present();
  }

  startOolaga(){
    if(this.oolaga.service.id==7){
      let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'startLaboroolaga',locations:this.locations});
      alert.onDidDismiss(data=>{
        this.submit();  
        if(data=='no'){
        }
        else if(data=='yes'){
          this.openMap_platform(this.oolaga.source.location_name)
          // this.openMap(this.oolaga.source.location_name,null);
        }
      })
      alert.present();
    }
    else if(this.oolaga.service.id!=7){
    	let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'startoolaga',locations:this.locations});
      alert.onDidDismiss(data=>{
        this.submit();  
        if(data=='no'){
        }
        else if(data=='yes'){
          this.openMap_platform(this.oolaga.source.location_name)
          // this.openMap(this.oolaga.source.location_name,null);
        }
      })
      alert.present();
    }
  }

  confirmMeetupLocation(){
    let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'confirmMeetupLocation',locations:this.locations});
      alert.onDidDismiss(data=>{
        if(data=='no'){
        }
        else if(data=='yes'){
          this.submit();  
          // this.openMap_platform(this.oolaga.source.location_name)
          // this.openMap(this.oolaga.source.location_name,null);
        }
      })
      alert.present();
  }

  confirmPickup1(){
    let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'confirmPickup1',locations:this.locations});
    alert.onDidDismiss(data=>{
      this.submit();  
      if(data=='no'){
      }
      else if(data=='yes'){
        if(this.locations==2){
          this.openMap_platform(this.oolaga.destination.location_name)
          // this.openMap(this.oolaga.source,this.oolaga.destination);
        }else{
          this.openMap_platform(this.oolaga.way_point1.location_name)
          // this.openMap(this.oolaga.source,this.oolaga.way_point1);
        }
      }
    })
    alert.present();
  }

  confirmPickup2(){
    let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'confirmPickup2',locations:this.locations});
    alert.onDidDismiss(data=>{
      this.submit();  
      if(data=='no'){
      }
      else if(data=='yes'){
        if(this.locations==3){
          this.openMap_platform(this.oolaga.destination.location_name)
          // this.openMap(this.oolaga.way_point1,this.oolaga.destination);
        }
        else{
          this.openMap_platform(this.oolaga.way_point2.location_name)
          // this.openMap(this.oolaga.way_point1,this.oolaga.way_point2);
        }
      }
    })
    alert.present();
  }

  confirmPickup3(){
    let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'confirmPickup3',locations:this.locations});
    alert.onDidDismiss(data=>{
      this.submit();  
      if(data=='no'){
      }
      else if(data=='yes'){
          this.openMap_platform(this.oolaga.destination.location_name)
        // this.openMap(this.oolaga.way_point2,this.oolaga.destination);
      }
    })
    alert.present();
  }

  droplocation(){
    let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'dropLocation',locations:this.locations});
    alert.onDidDismiss(data=>{
      if(data=='no'){
      }
      else if(data=='yes'){
        this.submit();  
        // this.openMap(this.oolaga.destination,null);
      }
    })
    alert.present();
  }
  
  endOolaga(){
    if(this.oolaga.service.id==7){
      let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'endoolaga',locations:this.locations});
      alert.onDidDismiss(data=>{
        if(data=='no'){
          console.log('No');
        }
        else if(data=='yes'){
          this.submit();  
        }
      })
      alert.present();
    }
    else if(this.oolaga.service.id!=7){
      let alert = this.modalCtrl.create(Alert,{olaga:null,alert:'endoolaga',locations:this.locations});
      alert.onDidDismiss(data=>{
        if(data=='no'){
          console.log('No');
        }
        else if(data=='yes'){
          this.submit();  
        }
      })
      alert.present();
    } 
	
	    //this.submit();  
  }
  openMapButton(){
    if(this.oolaga.service.id==7){
      if(this.oolaga.track_status=='start_oolaga' || this.oolaga.track_status=='confirm_meet_up_location'){
          this.openMap_platform(this.oolaga.source.location_name);
          // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.source.location_name);
          // this.openMap(this.oolaga.source,null);
      }
    }
    else if(this.oolaga.service.id!=7){
      if(this.oolaga.track_status=='start_oolaga'){
          this.openMap_platform(this.oolaga.source.location_name);
          // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.source.location_name);
          // this.openMap(this.oolaga.source,null);
      }else if(this.oolaga.track_status=='confirm_pickup_1'){
          if(this.locations==2){
          this.openMap_platform(this.oolaga.destination.location_name);
          // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.destination.location_name);
            // this.openMap(this.oolaga.source,this.oolaga.destination);
          }else{
          this.openMap_platform(this.oolaga.way_point1.location_name);
          // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.way_point1.location_name);
            // this.openMap(this.oolaga.source,this.oolaga.way_point1);
          }
      }else if(this.oolaga.track_status=='confirm_pickup_2'){
          if(this.locations==3){
          this.openMap_platform(this.oolaga.destination.location_name);
          // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.destination.location_name);
            // this.openMap(this.oolaga.way_point1,this.oolaga.destination);
          }
          else{
          this.openMap_platform(this.oolaga.way_point2.location_name);
          // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.way_point2.location_name);
            // this.openMap(this.oolaga.way_point1,this.oolaga.way_point2);
          }
      }else if(this.oolaga.track_status=='confirm_pickup_3'){
          this.openMap_platform(this.oolaga.destination.location_name);
          // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.destination.location_name);
          // this.openMap(this.oolaga.way_point2,this.oolaga.destination);
      }else{
      }
    }
  }
  openMap_platform(value){
    if (this.device.platform.toUpperCase() === "ANDROID") {
        window.open("https://www.google.com/maps/search/?api=1&query="+value);
    } else if (this.device.platform.toUpperCase() === "IOS") {
        window.open("http://maps.apple.com/?daddr=" + value + "&z=10&t=k", "_system");
    }
  }
  openMap(location1,location2){
        this.navCtrl.push(Map,{location1:location1,location2:location2,status:this.oolaga.track_status});
  }
  openMessage(value,image,name,lastname, oolaga_id){
    let msg = this.modalCtrl.create(MessageOpen,{id:value,image:image,name:name, last:lastname, oolaga_id: oolaga_id})
    msg.present();
  }
  withdrowOolaga(){
    let alert = this.alertCtrl.create({
      message:'Êtes-vous sûr de vouloir annuler votre projet?',
      buttons:[{
                text:'NON',
                handler:()=>{
                }
              },{
                text:'OUI',
                handler:()=>{
                  let cancelpage = this.modalCtrl.create(Canceloolaga,{oolaga:this.oolaga})
                  cancelpage.present()
                  cancelpage.onDidDismiss(data=>{
                    if(data && data.status=='hello'){
                    console.log(data);
                    this.navCtrl.pop();
                    }
                  })
                  // let loading = this.loadingCtrl.create();
                  // Observable.of(loading).flatMap(loading => loading.present())
                  //  .flatMap(data => this.securityProvider.cancelOolaga(this.oolaga.id,JSON.parse(this.oolaga.helper_id)))
                  //  .subscribe(data =>loading.dismiss().then(() =>{
                  //        console.log(data);
                  //        if(data.response){
                  //          this.navCtrl.pop();
                  //        }else{
                  //        }
                  //     }),
                  //    error=>{    
                  //        console.log(error);
                  //   })
                
                }
              }]

    })
    alert.present()
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
  getStringValue(string){
	  return  string.replace(/<[^>]*>/g, '');
  }
}
