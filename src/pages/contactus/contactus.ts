import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { TranslateService} from '@ngx-translate/core';
import { SecurityProvider } from '../../providers/securityProvider'
import { Observable} from "rxjs/Rx";
import {Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class Contactus {
name
email
description
contact
details;
  constructor(public formBuilder:FormBuilder,
              public navCtrl: NavController,
  			      public navParams: NavParams, 
              private loadingCtrl:LoadingController,
              private translateService:TranslateService,
              private securityProvider: SecurityProvider,
              private alertCtrl:AlertController) {
    let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.details = formBuilder.group({
               name:['' , Validators.compose([Validators.maxLength(20),Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
               email:['' , Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
               description:['' , Validators.compose([Validators.maxLength(100),Validators.minLength(0), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
              });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contactus');
  }

  Contactus(){
    if(this.details.valid){
      let loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(loading => loading.present())
        .flatMap(() => this.securityProvider.contactus(this.details.controls["name"].value,this.details.controls["email"].value,this.details.controls["description"].value,222))
        .subscribe(data=>{
          console.log(data.response);
          loading.dismiss();
          if(data.response ==true){
            let alert=this.alertCtrl.create({
                title:'Merci',
                message:"Nous vous contacterons dès que possible ",
                buttons:['Ok']
              })
              alert.present();
          }
          else if(data.response ==false){
            let alert=this.alertCtrl.create({
                title:'Pardon',
                message:"Entrez tous les champs " ,
                buttons:['Ok']
              })
              alert.present();
          }
      })
    }else if(!this.details.controls["name"].valid){
      let alert=this.alertCtrl.create({
                message:" Veuillez saisir un nom avec au moins 3 caractères" ,
                buttons:['Ok']
              })
              alert.present();
    }else if(!this.details.controls["email"].valid){
      let alert=this.alertCtrl.create({
                message:" Veuillez saisir une adresse email valide" ,
                buttons:['Ok']
              })
              alert.present();
    }else{
      let alert=this.alertCtrl.create({
                message:"Veuillez saisir un message" ,
                buttons:['Ok']
              })
              alert.present();
    }
  }
}
