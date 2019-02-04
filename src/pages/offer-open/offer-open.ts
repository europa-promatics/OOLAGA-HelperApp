import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ModalController,AlertController } from 'ionic-angular';
import { Alert } from '../alert/alert'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs/Rx'
import { UserProvider } from '../../providers/userProvider'
import { SecurityProvider } from '../../providers/securityProvider'
import { ENV } from "../../app/env";
import { Timer,ObjectTimer } from '../../pipes/timer';
import { OpenItemPic } from '../open-item-pic/open-item-pic'
declare var google;
@Component({
  selector: 'page-offer-open',
  templateUrl: 'offer-open.html',
})
export class OfferOpen {
map;
oolaga;
my:any;
User
show:boolean=false;
contenttick:boolean=false;
amount;
demo:number;
checkresult;
mycheckresult;
checkresult2;
mycheckresult2;
selected_item=0;
  constructor(private userProvider:UserProvider,
              private securityProvider:SecurityProvider,private alertCtrl:AlertController,
              private translateService:TranslateService,
              public loadingCtrl:LoadingController,
              public navCtrl: NavController,public modalCtrl: ModalController,
              public navParams: NavParams) {
              this.oolaga=this.navParams.get('oolaga');
              this.my=ENV.mainApi
			  console.log(this.oolaga);
  }
  contentshow()
  {
    this.contenttick=true
    alert(this.contenttick)

  }
  ionViewDidEnter() {
    this.securityProvider.viewOolaga({helper_id:this.userProvider.user.id,oolaga_id:this.oolaga.id}).subscribe(data=>{
    },err=>{
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferOpen');

    
  }
  openPic(pic){
    pic=this.my+'/public/frontend/img/addImage/'+pic;
    let model = this.modalCtrl.create(OpenItemPic,{pic:pic})
    model.present()
  }
  acceptOolaga(){
  }
  placebid(){
   let profileModal = this.modalCtrl.create(Alert,{olaga:this.oolaga,alert:'bidding'});
   profileModal.present();
   profileModal.onDidDismiss(data => {
      if(data==false){}
      else{
        this.amount=data
        console.log(data);
        if(this.amount>0){
            let loading = this.loadingCtrl.create();
            Observable.of(loading).flatMap(loading => loading.present())
            .flatMap(() => this.securityProvider.enterbid( this.oolaga.id,this.userProvider.user.id,this.amount))
            .subscribe(data=>{
                console.log(JSON.stringify(data.message));
                if(data.message=='success!'){
                loading.dismiss();
                let alert=this.alertCtrl.create({
                  message:"Votre offre a été soumise avec succès" ,
                  buttons:['Ok']
                })
                alert.present();
                this.navCtrl.pop()
                }
                else{
                  alert('error')
                  loading.dismiss();
                }
            })
        }
        else{
           /*  let alert=this.alertCtrl.create({
            message:" S'il vous plaît entrer une offre valide " ,
            buttons:['Ok']
            })
            alert.present(); */
        }
      }
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

getStringValue(string){
	  return  string.replace(/<[^>]*>/g, '');
  }
getDetails(jsondata){
  //alert( JSON.stringify(jsondata));
  return "";
}
}
