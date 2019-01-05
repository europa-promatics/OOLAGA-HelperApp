import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { TranslateService} from '@ngx-translate/core';
import { Observable} from "rxjs/Rx";
import{ SecurityProvider} from '../providers/securityProvider'
import { LoadingController } from 'ionic-angular';
import {UserProvider} from '../providers/userProvider';



/*
  Generated class for the Timetracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Timetracker {

	 public watch: any;    
  public lat: number = 0;
  public lng: number = 0;

  constructor(public http: Http,public zone: NgZone,private geolocation: Geolocation,
    private loadingCtrl:LoadingController, private translateService: TranslateService, private userProvider:UserProvider,
private securityProvider: SecurityProvider) {
    console.log('Hello Timetracker Provider');
  }


startTracking() {
 
  // Background Tracking
 
//   let config = {
//     desiredAccuracy: 0,
//     stationaryRadius: 20,
//     distanceFilter: 10, 
//     debug: true,
//     interval: 2000 
//   };
 
//   this.backgroundGeolocation.configure(config).subscribe((location) => {
 
//     console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
//     // Run update inside of Angular's zone
//     this.zone.run(() => {
//       this.lat = location.latitude;
//       this.lng = location.longitude;
//     });
 
//   }, (err) => {
//     console.log(err);
 
//   });
 
//   // Turn ON the background-geolocation system.
//   this.backgroundGeolocation.start();
 
 
//   // Foreground Tracking
 
// let options = {
//   frequency: 3000, 
//   enableHighAccuracy: true
// };
 
// this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
  
 
//   // Run update inside of Angular's zone
//   this.zone.run(() => {
//     this.lat = position.coords.latitude;
//     this.lng = position.coords.longitude;

//      this.tracker( this.lat,this.lng)
//   });
 
// });
 

  }

tracker(mylat,mylong){



   let  loading = this.loadingCtrl.create({content: this.translateService.instant('action.processing')});
     Observable.of(loading)
     // .flatMap(loading => loading.present())
     .flatMap(() => this.securityProvider.trackolaga(this.userProvider.user.id,mylong,mylat))
     
     .subscribe(data=>{

      console.log(data.response);
       //loading.dismiss();


setTimeout(()=>{
//this.tracker(this.lat,this.lng)
},10000)


})
   }


  stopTracking() {
 //this.backgroundGeolocation.finish();
  this.watch.unsubscribe();

 
  }
 


}
