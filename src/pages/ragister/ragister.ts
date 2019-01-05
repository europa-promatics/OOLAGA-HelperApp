import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { SecurityProvider} from '../../providers/securityProvider'
import { Observable} from "rxjs/Rx";
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-ragister',
  templateUrl: 'ragister.html',
})
export class Ragister {
	firstname
	lastname
	email
	number
	user_type=1;
	password
  constructor(private securityProvider:SecurityProvider,
  			  private translateService:TranslateService,
  			  public loadingCtrl:LoadingController,
  			  public navCtrl: NavController,
  			  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Ragister');
  }
  signUp(){
  	let loading = this.loadingCtrl.create();
    Observable.of(loading).flatMap(loading => loading.present())
    .flatMap(() => this.securityProvider.ragister(this.firstname,this.lastname,this.email,this.number,this.user_type,this.password))
    .subscribe(data=>{
      console.log(data)
      loading.dismiss();
    })
  }
}
