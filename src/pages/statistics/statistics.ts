import { Component, ViewChild,ElementRef} from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SecurityProvider} from '../../providers/securityProvider'
import { Observable } from 'rxjs/Rx'
import { UserProvider } from '../../providers/userProvider'
import { ENV} from '../../app/env'
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class Statistics {
  options=[{name:'Les 7 derniers jours',value:0},{name:'Les 15 derniers jours',value:1},{name:'Les 30 derniers jours',value:2}];
  days;
  data;
  fulldata;
  // index:number=0;
  curDate:any=new Date();
  curMonth=['DECEMBRE','NOVEMBRE','OCTOBRE','SEPTEMBRE','AOÛT','JUILLET','JUIN','MAI','AVRIL','MARS','FEVRIER','JANVIER'];
  month
  lastdate;
  lastmonth;
  constructor(public userProvider:UserProvider,public alertCtrl:AlertController,public loadingCtrl:LoadingController,public securityProvider:SecurityProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.days=this.options[0];
    this.data;
    this.curMonth.reverse()
    this.curDate = this.curDate.getDate();
    this.month = new Date().getMonth();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Statistics');
    let loading = this.loadingCtrl.create();
            Observable.of(loading).flatMap(loading => loading.present())
            .flatMap(() => this.securityProvider.getStatistics(this.userProvider.user.id))
            .subscribe(data=>{
              if(data.response){
                data.seven.lastdate.date=this.curMonth[new Date(data.seven.lastdate.date).getMonth()]+' '+new Date(data.seven.lastdate.date).getDate();
                data.fifteen.lastdate.date=this.curMonth[new Date(data.fifteen.lastdate.date).getMonth()]+' '+new Date(data.fifteen.lastdate.date).getDate();
                data.thirty.lastdate.date=this.curMonth[new Date(data.thirty.lastdate.date).getMonth()]+' '+new Date(data.thirty.lastdate.date).getDate();
                this.data=[data.seven,data.fifteen,data.thirty];
                this.fulldata=data;
                console.log(this.data)
              }
              else{
                let alert=this.alertCtrl.create({
                  title:'Oops..',
                  buttons:['Ok']
                })
                alert.present();
              }
                loading.dismiss()
            },error=>{
                loading.dismiss()
              let alert=this.alertCtrl.create({
                  title:'Temps libre',
                  buttons:['Ok']
                })
              alert.present();
            })
  }

}
