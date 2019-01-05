import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ModalController,LoadingController } from 'ionic-angular';
import { ENV } from '../../app/env'
import { SecurityProvider } from '../../providers/securityProvider';
import { Alert } from '../alert/alert'
import { Map } from '../map/map';
import { MessageOpen } from '../message-open/message-open'

import { Observable} from "rxjs/Rx";
import { TranslateService} from '@ngx-translate/core';

import { Canceloolaga } from '../canceloolaga/canceloolaga';
import { Device }from '@ionic-native/device'
import { OpenItemPic } from '../open-item-pic/open-item-pic';
import { Tabs } from '../tabs/tabs';
/**
 * Generated class for the ParticularOolaga page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-particular-oolaga',
  templateUrl: 'particular-oolaga.html',
  providers:[SecurityProvider]
})

export class ParticularOolaga implements OnInit{
	oolagaId;
    my:any;
    oolaga;
    startOolagaButton:boolean=false;
    endOolagaButton:boolean=false;
    confirmPickupButton1:boolean=false;
    confirmPickupButton2:boolean=false;
    confirmPickupButton3:boolean=false;
    completeOolaga:boolean=false;
    locations
    startTime;
    currentTime;
    selected_item=0;
    start_enable:boolean=false;
    a
  constructor(public securityProvider:SecurityProvider,
      public navCtrl: NavController,
      public device:Device,
      private translateService:TranslateService,
      public loadingCtrl:LoadingController,
      public modalCtrl:ModalController,
      public alertCtrl:AlertController,
      public navParams: NavParams) {
  	this.oolagaId=navParams.get('oolagaId');
      // alert(+this.oolagaId)
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

  ngOnInit() {
    let data={
      // id:this.oolagaId;
      oolaga_id:+this.oolagaId
    }
    this.securityProvider.getOolagaDetailsById(data).subscribe(data=>{
           // alert(JSON.stringify(data.data));
        if (data.response==true) {
           this.oolaga=data.data[0];
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
        }
    },err=>{
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularOolaga');
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
               this.navCtrl.pop();
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
      message:'Cette page est un récapitulatif de votre projet que vous vous êtes engagés à réaliser. Appuyez sur "Démarrer" pour débuter votre projet. Vous pouvez également rapidement le géolocaliser et discuter avec votre client à travers l’outil de messagerie en appuyant sur les icônes en bas de la page.',
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
  openMessage(value,image,name){
    let msg = this.modalCtrl.create(MessageOpen,{id:value,image:image,name:name})
    msg.present();
  }
  withdrowOolaga(){
    let alert = this.alertCtrl.create({
      message:  'Êtes-vous certain de vouloir annuler votre projet?',
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

  onBackButton(){
      this.navCtrl.setRoot(Tabs)
  }

}
