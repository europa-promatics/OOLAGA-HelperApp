import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env'; 
/**
 * Generated class for the PopOver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pop-over',
  templateUrl: 'pop-over.html',
})
export class PopOver {
http

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  public viewCtrl: ViewController, 
			  public alertCtrl: AlertController,
			  public loadingCtrl: LoadingController,
			  http:Http) {
				  this.http=http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOver');
  }
  close() { 
    this.viewCtrl.dismiss();
  }

  onChangePassword(){
	 this.presentPrompt();
  }
  
  presentPrompt() {
  this.close();
  let alert = this.alertCtrl.create({
    title: 'Changer le mot de passe',
    inputs: [
      {
        name: 'password',
        placeholder: 'Mot de passe actuel',
		type: 'password'
      },
      {
        name: 'newpassword',
        placeholder: 'nouveau mot de passe',
        type: 'password'
      },
	  {
        name: 'confirmpassword',
        placeholder: 'Confirmer le nouveau mot de passe',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'ANNULER',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'sauvegarder',
        handler: data => {
         if(data.password && data.password.length<8 && data.password.length!=0)
			 {
			  let alert = this.alertCtrl.create({
												  title: 'Oops..!',
												  subTitle: 'Veuillez entrer un mot de passe de 8 caractères minimum',
												  buttons: ['OK']
												});
				  alert.present();
				  return false;
			 } else {
              if(data.newpassword!=data.confirmpassword){
				    let alert = this.alertCtrl.create({
												  title: 'Oops..!',
												  subTitle: 'Les champs Votre mot de passe et Confirmer le mot de passe ne correspondent pas!',
												  buttons: ['OK']
												});
				  alert.present();
				  return false;
			  }else{
				  console.log('Password Accepted!');
				   let loader = this.loadingCtrl.create();
              loader.present();
console.info(JSON.parse(localStorage['userdata']).id);
          var userData = JSON.stringify({
                                      user_id:JSON.parse(localStorage['userdata']).id,
                                      old_password:data.password,
									  new_password:data.newpassword
                                    });
          this.http.post('http://18.188.229.2/oolaga/webservicehelperChangePassword', userData).subscribe(response => {
              loader.dismiss();
                  var message=JSON.parse(response._body).message;
                  if(JSON.parse(response._body).response==true){
                      let alert = this.alertCtrl.create({
                          title: 'Mot de passe mis à jour avec succès',
                          buttons: ['OK']
                      });
                      alert.present();
                   
                       localStorage['password']=data.password;
                       //this.events.publish('changeProfileData',true);
              

                  }
                  else if(JSON.parse(response._body).response==false){
                      let alertf = this.alertCtrl.create({
                          title: 'Error!',
                          subTitle: message,
                          buttons: ['OK']
                      });
                      alertf.present();
                  }
              console.log(JSON.parse(response._body).response);
          }, error => {
              console.log(error);
          });
			  }
          }
        }
      }
    ]
  });
  alert.present();
}
}




