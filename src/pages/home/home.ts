import { Component, ViewChild, } from '@angular/core';
import { Content, Refresher } from 'ionic-angular'
import { NavController, NavParams,Events, LoadingController, AlertController,ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider } from '../../providers/securityProvider';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs/Rx";
import { Timetracker } from '../../providers/timetracker';
import { OfferOpen } from '../offer-open/offer-open';
import { MessageOpen } from '../message-open/message-open';
import { Myoolaga } from '../myoolaga/myoolaga';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class Home {
  oolaga;
  myoolaga;
  current_date
  @ViewChild(Content) content: Content;
  @ViewChild(Refresher) refresher: Refresher;
  constructor(public modalCtrl:ModalController,
              private alertCtrl:AlertController,private loadingCtrl:LoadingController,
              private translateService:TranslateService,
              private securityProvider:SecurityProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider:UserProvider,
              private events:Events,
              public locationTracker: Timetracker
              ) {
				      
				setInterval(() => {
				  this.updateData();
				}, 5000); 
  }

  doRefresh(refresh,value){
      this.loadData(refresh,value)
  }

  ionViewDidLoad() {
    //this.locationTracker.startTracking();
    console.log('ionViewDidLoad Home');
    let data=JSON.parse(localStorage['userdata']);
    this.userProvider.createNew();
    this.userProvider.user.email=data.email;
    this.userProvider.user.city=data.city;
    this.userProvider.user.firstname=data.firstname;
    this.userProvider.user.id=data.id;
    this.userProvider.user.image=data.image;
    this.userProvider.user.lastname=data.lastname;
    this.userProvider.user.number=data.number;
    this.userProvider.user.user_type=data.user_type;
    this.events.publish('user:login',true);
    this.userProvider.consoleData();
  }

  loadData(refresh?:any,value?:any){
   this.securityProvider.getmyolaga(this.userProvider.user.id)
     .subscribe(data =>{
                       this.myoolaga = data.data
                       this.myoolaga.reverse();
					   console.log(this.myoolaga);
                       if(value){
                         refresh.complete();
                       }
                    }),
               error=>{
                       if(value){
                         refresh.complete();
                       }
                      let alert=this.alertCtrl.create({
                        title:'Temps libre',
                        buttons:['Ok']
                      })
                      alert.present()
    }
  }
  //11/21/1987 16:00:00
  dateCompare(date, time, status){

	 if(status=='end_oolaga'){
		  return true;
	  }else{
	  var date_parts=date.split('-');
	 
	  var year='20'+date_parts[2]; 
	  var month=date_parts[1];
	  var day=date_parts[0];
	  var final_date=new Date(year+'-'+month+'-'+day+'T'+this.convertTime12to24(time));
	  var today= new Date();
	  //console.log(final_date); 
	  var milliseconds_oolaga_date = final_date.getTime(); 
	  var milliseconds_today= today.getTime();
		if(milliseconds_today > milliseconds_oolaga_date){
			return true;
		}else{
			return false;
		}
	  } 
  }
  
  convertTime12to24(time12h) {
	  const [time, modifier] = time12h.split(' ');
	  let [hours, minutes] = time.split(':');
	  if (hours === '12') {
		hours = '00';
	  }
	  if (modifier === 'pm') {
		hours = parseInt(hours, 10) + 12;
	  }
	  return hours + ':' + minutes;
	}
  updateData(){
	  this.securityProvider.getmyolaga(this.userProvider.user.id)
     .subscribe(data =>{
                       this.myoolaga = data.data
                       this.myoolaga.reverse();
                    
                    }),
               error=>{
                      
                      let alert=this.alertCtrl.create({
                        title:'Temps libre',
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

  openMyoolaga(value, flag) {
      let oolaga = this.modalCtrl.create(Myoolaga,{data:value, flag:flag})
      oolaga.onDidDismiss(()=>{
        this.ionViewDidEnter()
      })    
      oolaga.present();
  }

  openMessage(value,image,name, lastname, oolaga_id){
	 // alert(lastname);
    let msg = this.modalCtrl.create(MessageOpen,{id:value,image:image,name:name, oolaga_id:oolaga_id, last:lastname})
    msg.onDidDismiss(()=>{
      this.ionViewDidEnter()
    }) 
    msg.present();
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
