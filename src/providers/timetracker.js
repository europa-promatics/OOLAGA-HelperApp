var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs/Rx";
import { SecurityProvider } from '../providers/securityProvider';
import { LoadingController } from 'ionic-angular';
import { UserProvider } from '../providers/userProvider';
/*
  Generated class for the Timetracker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var Timetracker = /** @class */ (function () {
    function Timetracker(http, zone, geolocation, loadingCtrl, translateService, userProvider, securityProvider) {
        this.http = http;
        this.zone = zone;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.userProvider = userProvider;
        this.securityProvider = securityProvider;
        this.lat = 0;
        this.lng = 0;
        console.log('Hello Timetracker Provider');
    }
    Timetracker.prototype.startTracking = function () {
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
    };
    Timetracker.prototype.tracker = function (mylat, mylong) {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('action.processing') });
        Observable.of(loading)
            // .flatMap(loading => loading.present())
            .flatMap(function () { return _this.securityProvider.trackolaga(_this.userProvider.user.id, mylong, mylat); })
            .subscribe(function (data) {
            console.log(data.response);
            //loading.dismiss();
            setTimeout(function () {
                //this.tracker(this.lat,this.lng)
            }, 10000);
        });
    };
    Timetracker.prototype.stopTracking = function () {
        //this.backgroundGeolocation.finish();
        this.watch.unsubscribe();
    };
    Timetracker = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, NgZone, Geolocation,
            LoadingController, TranslateService, UserProvider,
            SecurityProvider])
    ], Timetracker);
    return Timetracker;
}());
export { Timetracker };
//# sourceMappingURL=timetracker.js.map