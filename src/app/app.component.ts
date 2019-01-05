import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController,LoadingController,Events,ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { FCM } from '@ionic-native/fcm';
import { Device }from '@ionic-native/device'
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService} from '@ngx-translate/core';
import { Observable} from "rxjs/Rx";
import { UserProvider} from '../providers/userProvider'; 
import { SecurityProvider} from '../providers/securityProvider'
import { Timetracker } from '../providers/timetracker';
import { ENV} from "./env";
import { About } from '../pages/about/about';
import { Profile }from '../pages/profile/profile';
import { Tabs } from '../pages/tabs/tabs';
import { Login }from '../pages/login/login';
import { Start }from '../pages/start/start';
import { Contactus } from '../pages/contactus/contactus'
import { Statistics} from '../pages/statistics/statistics'
import { Payment} from '../pages/payment/payment'
import { Invite } from '../pages/invite/invite'
import { Settings } from '../pages/settings/settings' 
import { Auction } from '../pages/auction/auction' 
import { How } from '../pages/how/how';
import { Myoolaga } from '../pages/myoolaga/myoolaga';
import { MessageOpen } from '../pages/message-open/message-open';
import { Ragister } from '../pages/ragister/ragister';
import { PopOver } from '../pages/pop-over/pop-over';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';
import { ParticularOolaga } from '../pages/particular-oolaga/particular-oolaga'
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
// const config: BackgroundGeolocationConfig = {
//             desiredAccuracy: 10,
//             stationaryRadius: 20,
//             distanceFilter: 30,
//             debug: true, //  enable this hear sounds for background-geolocation life-cycle.
//             stopOnTerminate: false, // enable this to clear background location settings when the app terminates
//     };
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any ;
  pages: Array<{title: string, component: any, icon: string}>;
  img='';
  name="name";
  current_lat;
  current_long;
  enable:boolean=true;
  count=0;
  constructor(
              public geolocation:Geolocation,
              public device:Device,private fcm:FCM,
              public alertController:AlertController,
              public events:Events,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen, 
              private translateService: TranslateService,
              private modalCtrl: ModalController,
              private userProvider:UserProvider,
              public locationTracker: Timetracker,
              private loadingCtrl:LoadingController,
              private securityProvider: SecurityProvider,
			  
			) 

  {
    this.initializeApp();
	
    this.pages = [
      { title: 'Vos projets', component: Tabs , icon: 'img/home.png'},
      { title: 'Statistiques', component: Statistics , icon: 'img/statistics.png'},
      { title: 'Paiements', component: Payment , icon: 'img/credit-card.png'},
      { title: 'Invitez un ami', component: Invite , icon: 'img/invite.png'},
      { title: 'Paramètres', component: Settings , icon: 'img/setting.png'},
      { title: 'Comment ça marche?', component: How , icon: 'img/howitworks.png'},
      { title: 'À propos', component: About , icon: 'img/about.png'},
      { title: 'Contactez-nous', component: Contactus , icon: 'img/contactus.png'}
    ];
	

  }
	notification(data){
		if(data.type=='msg'){
		  let msg = this.modalCtrl.create(MessageOpen,{id:data.user_id,image:data.user_image,name:data.user_name, oolaga_id:data.oolaga_id})
		  msg.present();
		}
		 if(data.type=='received'){
	
		 	this.nav.push(Tabs, {index:1});
		}
		if(data.type=='oolagaAssigned'){
		
		 	this.nav.push(Myoolaga,{data:JSON.parse(data.oolaga_detail)});
		}
	}
	initializeAppDuplicate() {
		
		this.platform.ready().then(() => {
			//     this.nav.push(Myoolaga,{data:});
		this.translateService.setDefaultLang(ENV.language);
		this.translateService.use(ENV.language)
		  if(localStorage['login']=="true" || localStorage['login']==true){
			this.rootPage=Tabs;  
		  }else{
			this.rootPage=Start;
		  }
		  this.events.subscribe('user:login', (data) => {
			this.img='http://18.188.229.2/oolaga-french/public/img/helperfiles/' + this.userProvider.user.image;
			this.name=this.userProvider.user.firstname+' '+this.userProvider.user.lastname.charAt(0).toUpperCase();
		  });
		  this.events.subscribe('enablePopup', (data) => {
			this.enable=data;
		  });
		  this.statusBar.styleDefault();
		  this.splashScreen.hide();
		  setInterval(()=>{
			if(this.userProvider.user.id!=undefined){
			  return this.geolocation.getCurrentPosition().then((position) => {
				console.log(position)
				this.securityProvider.track(this.userProvider.user.id,position.coords.latitude,position.coords.longitude).subscribe(data=>{            
				})
			  },err=>{
				console.log(err)
			  })
			}
		  },5000)
		});
  } //Myoolaga,{data:value}
  initializeApp() {
		this.platform.ready().then(() => {
		this.translateService.setDefaultLang(ENV.language);
		this.translateService.use(ENV.language)
		this.fcm.onNotification().subscribe(data=>{
			   if(data.wasTapped){
				  
				 console.log("Received in background");
				 this.notification(data);
				  let a = this.alertController.create({
					 title:data.title,
					 message:data.body,
					 buttons: [{
					text: 'OK',
					handler: data => {
					console.log('Cancel clicked');
					if(data.type=='msg'){
					let msg = this.modalCtrl.create(MessageOpen,{id:data.user_id,image:data.user_image,name:data.user_name})
					msg.present();
					}
					if(data.type=='oolagaAssigned'){
						
		 	         // this.nav.push(Myoolaga,{data:data.oolaga_detail});
					    let alert = this.alertController.create({
                title:JSON.parse(data).title,
                message:JSON.parse(data).body,
                buttons:[{
                  text:'Open',
                  handler:()=>{
                     this.nav.push(Myoolaga,{data:JSON.parse(data.oolaga_detail)});
                  }
                }]
              })
              alert.present();
					}
				}}]
			   })
				a.present();
			   
			   } else {
				  
				 if(data.type!="oolagaAssigned"){
				  let a = this.alertController.create({
					 title:data.title,
					 message:data.body,
					 buttons: [{
					text: 'Done',
					handler: data => {
					console.log('Cancel clicked');
					if(data.type=='msg'){
					let msg = this.modalCtrl.create(MessageOpen,{id:data.user_id,image:data.user_image,name:data.user_name})
					msg.present();
					}
					
				}}]
			   })
				a.present();
				
				
			   } 
			   if(data.type=="oolagaAssigned"){
				let alert = this.alertController.create({
                title:data.title,
                message:data.body,
                buttons:[{
                  text:'Open',
                  handler:()=>{
                     this.nav.push(Myoolaga,{data:JSON.parse(data.oolaga_detail)});
                  }
                }]
              })
              alert.present();
					}
			   
			  
			   console.log("Received in foreground");
			  }
			})   
		  if(localStorage['login']=="true" || localStorage['login']==true){
			this.rootPage=Tabs;  
		  }else{
			this.rootPage=Start;
		  }
		  this.events.subscribe('user:login', (data) => {
			this.img='http://18.188.229.2/oolaga-french/public/img/helperfiles/' + this.userProvider.user.image;
			this.name=this.userProvider.user.firstname+' '+this.userProvider.user.lastname.charAt(0).toUpperCase();
		  });
		  this.events.subscribe('enablePopup', (data) => {
			this.enable=data;
		  });
		  this.statusBar.styleDefault();
		  this.splashScreen.hide();
		  setInterval(()=>{
			if(this.userProvider.user.id!=undefined){
			  return this.geolocation.getCurrentPosition().then((position) => {
				console.log(position)
				this.securityProvider.track(this.userProvider.user.id,position.coords.latitude,position.coords.longitude).subscribe(data=>{            
				})
			  },err=>{
				console.log(err)
			  })
			}
		  },5000)
		});
  }
  openPage(page) {
      if(page.title!='Dashboard'){
      this.nav.push(page.component);
      }
  }
  logout(){
    delete this.userProvider.user;
    this.userProvider.createNew();
    localStorage.clear();
    this.nav.setRoot(Start); 
	}
  open_profile(){
    this.nav.push(Profile);
  }
 }
