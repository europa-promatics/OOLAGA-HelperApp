import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/securityProvider'
/**
 * Generated class for the Canceloolaga page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-canceloolaga',
  templateUrl: 'canceloolaga.html',
})
export class Canceloolaga {
	oolaga;
	_1st:boolean=false;
	_2nd:boolean=false;
	_3rd:boolean=false;
	_4th:boolean=false;
	reasons;
  constructor(public alertCtrl:AlertController,public securityProvider:SecurityProvider,public loadingCtrl:LoadingController,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  	this.reasons=[]
  }
  help(){
    let alert = this.alertCtrl.create({
                 subTitle:"Veuillez garder à l’esprit que des frais d’annulation peuvent s’appliquer",
                 message:'Merci de vous référer à notre politique d’annulation disponible dans nos conditions générales de vente.',
                 buttons:['OK']
               })
               alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Canceloolaga');
  	this.oolaga=this.navParams.get('oolaga')
  	console.log(this.oolaga);
  	let loading = this.loadingCtrl.create();
      Observable.of(loading).flatMap(loading => loading.present())
       .flatMap(data => this.securityProvider.getReasons())
       .subscribe(data =>loading.dismiss().then(() =>{
             if(data.response){
             	console.log(data.message)
             	this.reasons=data.message;
             }else{

             }
          }),
         error=>{    
             console.log(error);
        })
  }
  submit(){
    if(this._1st || this._2nd || this._3rd || this._4th){
  	let a=[];	
  	if(this._1st){a.push(this.reasons[0].id)}
  	if(this._2nd){a.push(this.reasons[1].id)}
  	if(this._3rd){a.push(this.reasons[2].id)}
  	if(this._4th){a.push(this.reasons[3].id)}
  	console.log(a)
  	let loading = this.loadingCtrl.create();
  	let oolaga = JSON.stringify({
			    oolaga_id:this.oolaga.id,
			    helper_id:JSON.parse(this.oolaga.helper_id),
			    reasons:a.toString()
			  })
      Observable.of(loading).flatMap(loading => loading.present())
       .flatMap(data => this.securityProvider.cancelOolaga(oolaga))
       .subscribe(data =>loading.dismiss().then(() =>{
             if(data.response){
               let alert = this.alertCtrl.create({
               	subTitle:"YVotre projet a été annulé. Veuillez garder à l’esprit que des frais d’annulation peuvent s’appliquer.",
               	message:'Merci de vous référer à notre politique d’annulation disponible dans nos conditions générales de vente.',
               	buttons:['OK']
               })
               alert.present();
               alert.onDidDismiss(()=>{
  				this.viewCtrl.dismiss({status:'hello'});
               })
             }else{
             	
      //          let alert = this.alertCtrl.create({
      //          	subTitle:"Your oolaga was cancelled. Please keep in mind to ensure",
      //          	message:'You will be charged 20% of this oolaga / or not $xxx ( see cancellation policy )',
      //          	buttons:['OK']
      //          })
      //          alert.present();
      //          alert.onDidDismiss(()=>{
  				// this.viewCtrl.dismiss({status:'hello'});
      //          })
             }
          }),
         error=>{    
             console.log(error);
        })
    }else{
      let alert = this.alertCtrl.create({
                 message:'Veuillez sélectionner un motif d’annulation',
                 buttons:['OK']
               })
               alert.present();
    }
  }
}
