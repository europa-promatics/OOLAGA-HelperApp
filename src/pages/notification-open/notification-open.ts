import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider} from '../../providers/securityProvider';
import { TranslateService} from '@ngx-translate/core';
import { Observable} from "rxjs/Rx"
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-notification-open',
  templateUrl: 'notification-open.html',
})
export class NotificationOpen {
	mynotificationdata
	notification;
	a
  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,private loading:LoadingController,
              private translateService:TranslateService,
              private securityProvider:SecurityProvider,
              public viewCtrl: ViewController,
              private userProvider:UserProvider)

               {
  	             this.mynotificationdata=this.navParams.get("notydata")
               }

deletenoty(){
	let loading =this.loading.create();
	 Observable.of(loading).flatMap(loading => loading.present())
	.flatMap(()=>this.securityProvider.deletenoty(this.mynotificationdata.id))
	.subscribe(data=>{
		loading.dismiss();
		this.viewCtrl.dismiss();
	})
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationOpen');
  }
}
