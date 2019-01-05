import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { SecurityProvider } from '../../providers/securityProvider'
import { TranslateService} from '@ngx-translate/core';
import { UserProvider } from '../../providers/userProvider';
import { Observable} from "rxjs/Rx";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
	distance:string='5';
  stairs:boolean=false;
  elevator:boolean=false;
  on_working_hour:boolean=false;
  zip_code:number;
  push:boolean;
  days=[{day:'Lundi ',selection:'active_0',status:"0"},
        {day:'Mardi ',selection:'active_0',status:"0"},
        {day:'Mercredi ',selection:'active_0',status:"0"},
        {day:'Jeudi ',selection:'active_0',status:"0"},
        {day:'Vendredi ',selection:'active_0',status:"0"},
        {day:'Samedi ',selection:'active_0',status:"0"},
        {day:'Dimanche ',selection:'active_0',status:"0"}]
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private securityProvider:SecurityProvider,
              private loadingCtrl:LoadingController,
              private translateService:TranslateService,
              private userProvider:UserProvider) {
  }
  selectDay(value){
    console.log(value)
    for(let i=0;i<this.days.length;i++){
      if(value==this.days[i]){
        if(this.days[i].selection=='active_1'){
          this.days[i].selection='active_0';
          this.days[i].status="0";
        }
        else if(this.days[i].selection=='active_0'){
          this.days[i].selection='active_1';
          this.days[i].status="1";
        }
      }
    }
  }
  saveData(){
    let loading = this.loadingCtrl.create();
    Observable.of(loading).flatMap(loading => loading.present())
    .flatMap(() => this.securityProvider.saveSettings(this.distance,this.stairs,this.elevator,this.days,this.zip_code,this.on_working_hour,this.push))
    .subscribe(data=>{

      console.log(data);
      this.navCtrl.pop();
      loading.dismiss();
      
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
    let loading = this.loadingCtrl.create();
    Observable.of(loading).flatMap(loading => loading.present())
    .flatMap(() => this.securityProvider.getSettingsData(this.userProvider.user.id))
    .subscribe(data=>{
      if(data.response)
      {  
        this.push=data.push_status=='Active'?true:false;
        this.distance=data.availability.distance;
        if(data.availability.stairs==0){
          this.stairs=false;
        }
        else{
          this.stairs=true;
        }
        if(data.availability.elevator==0){
          this.elevator=false;
        }
        else{
          this.elevator=true;
        }
        if(data.availability.on_working_hour==0){
          this.on_working_hour=false;
        }
        else{
          this.on_working_hour=true;
        }
        this.zip_code=data.availability.zip_code;
        this.days=[{day:'Lundi',selection:'active_0',status:data.availability.monday},
                  {day:'Mardi',selection:'active_0',status:data.availability.tuesday},
                  {day:'Mercredi',selection:'active_0',status:data.availability.wednesday},
                  {day:'Jeudi',selection:'active_0',status:data.availability.thursday},
                  {day:'Vendredi',selection:'active_0',status:data.availability.friday},
                  {day:'Samedi',selection:'active_0',status:data.availability.saturday},
                  {day:'Dimanche',selection:'active_0',status:data.availability.saturday}]
                  console.log(this.days)
        for(let i=0;i<7;i++){
          if(this.days[i].status=="0"){
            this.days[i].selection='active_0';
          }
          else{
            this.days[i].selection='active_1';
          }
        }
      }
      else{
        this.distance='1';
        this.stairs=false;
        this.elevator=false;
        this.days=[{day:'Lundi',selection:'active_0',status:"0"},
                  {day:'Mardi',selection:'active_0',status:"0"},
                  {day:'Mercredi',selection:'active_0',status:"0"},
                  {day:'Jeudi',selection:'active_0',status:"0"},
                  {day:'Vendredi',selection:'active_0',status:"0"},
                  {day:'Samedi',selection:'active_0',status:"0"},
                  {day:'Dimanche',selection:'active_0',status:"0"}]
      }
      console.log(data);
      loading.dismiss();
    })
  }

}
