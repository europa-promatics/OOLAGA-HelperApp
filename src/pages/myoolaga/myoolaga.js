var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { Alert } from '../alert/alert';
import { Map } from '../map/map';
import { MessageOpen } from '../message-open/message-open';
import { ENV } from "../../app/env";
import { Observable } from "rxjs/Rx";
import { TranslateService } from '@ngx-translate/core';
import { SecurityProvider } from '../../providers/securityProvider';
import { Canceloolaga } from '../canceloolaga/canceloolaga';
import { Device } from '@ionic-native/device';
import { OpenItemPic } from '../open-item-pic/open-item-pic';
var Myoolaga = /** @class */ (function () {
    function Myoolaga(device, securityProvider, translateService, loadingCtrl, modalCtrl, alertCtrl, navCtrl, navParams) {
        this.device = device;
        this.securityProvider = securityProvider;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.startOolagaButton = false;
        this.endOolagaButton = false;
        this.confirmPickupButton1 = false;
        this.confirmPickupButton2 = false;
        this.confirmPickupButton3 = false;
        this.completeOolaga = false;
        this.selected_item = 0;
        this.start_enable = false;
    }
    Myoolaga.prototype.checkstart = function () {
        var _this = this;
        this.currentTime = Date.parse(new Date().toString());
        if (this.startTime - this.currentTime < 1000 * 60 * 60 && (this.startTime + 1800000) > this.currentTime) {
            console.log(this.startTime);
            console.log(this.currentTime);
            console.log((this.startTime + 1800000) > this.currentTime);
            console.log(this.startTime - this.currentTime);
            console.log(this.startTime - this.currentTime < 1000 * 60 * 60);
            this.start_enable = true;
        }
        else {
            setTimeout(function () { _this.checkstart(); }, 15000);
            console.log(this.startTime - this.currentTime < 1000 * 60 * 60);
        }
    };
    Myoolaga.prototype.ionViewWillLoad = function () {
        console.log('ionViewDidLoad Myoolaga');
        this.oolaga = this.navParams.get('data');
        var timer = this.oolaga.date;
        timer = timer.split('-')[0] + '-' + timer.split('-')[1] + '-20' + timer.split('-')[2];
        this.startTime = timer.split('-').reverse().toString().replace(',', '-').replace(',', '-') + 'T' + this.oolaga.first_time + ':00.000Z';
        this.startTime = Date.parse(this.startTime.replace('T', ' ').replace('.000Z', ''));
        this.currentTime = Date.parse(new Date().toString());
        this.my = ENV.mainApi;
        if (this.oolaga.way_point1 == null && this.oolaga.way_point2 == null) {
            this.locations = 2;
        }
        else if (this.oolaga.way_point1 != null && this.oolaga.way_point2 == null) {
            this.locations = 3;
        }
        else if (this.oolaga.way_point1 != null && this.oolaga.way_point2 != null) {
            this.locations = 4;
        }
        this.checkstart();
    };
    Myoolaga.prototype.openPic = function (pic) {
        pic = this.my + '/public/frontend/img/addImage/' + pic;
        var model = this.modalCtrl.create(OpenItemPic, { pic: pic });
        model.present();
    };
    Myoolaga.prototype.submit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return _this.securityProvider.trackOollaga(_this.oolaga.id); })
            .subscribe(function (data) { return loading.dismiss().then(function () {
            console.log(data);
            if (data.response) {
                _this.oolaga.track_status = data.message;
                if (data.message == 'end_oolaga') {
                    _this.navCtrl.pop();
                }
            }
            else {
            }
        }); }, function (error) {
            console.log(error);
        });
    };
    Myoolaga.prototype.help = function () {
        var alert = this.alertCtrl.create({
            message: 'Cette page est un récapitulatif de votre projet que vous vous êtes engagés à réaliser. Appuyez sur "Démarrer" pour débuter votre projet. Vous pouvez également rapidement le géolocaliser et discuter avec votre client à travers l’outil de messagerie en appuyant sur les icônes en bas de la page.',
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    };
    Myoolaga.prototype.startOolaga = function () {
        var _this = this;
        if (this.oolaga.service.id == 7) {
            var alert_1 = this.modalCtrl.create(Alert, { olaga: null, alert: 'startLaboroolaga', locations: this.locations });
            alert_1.onDidDismiss(function (data) {
                _this.submit();
                if (data == 'no') {
                }
                else if (data == 'yes') {
                    _this.openMap_platform(_this.oolaga.source.location_name);
                    // this.openMap(this.oolaga.source.location_name,null);
                }
            });
            alert_1.present();
        }
        else if (this.oolaga.service.id != 7) {
            var alert_2 = this.modalCtrl.create(Alert, { olaga: null, alert: 'startoolaga', locations: this.locations });
            alert_2.onDidDismiss(function (data) {
                _this.submit();
                if (data == 'no') {
                }
                else if (data == 'yes') {
                    _this.openMap_platform(_this.oolaga.source.location_name);
                    // this.openMap(this.oolaga.source.location_name,null);
                }
            });
            alert_2.present();
        }
    };
    Myoolaga.prototype.confirmMeetupLocation = function () {
        var _this = this;
        var alert = this.modalCtrl.create(Alert, { olaga: null, alert: 'confirmMeetupLocation', locations: this.locations });
        alert.onDidDismiss(function (data) {
            if (data == 'no') {
            }
            else if (data == 'yes') {
                _this.submit();
                // this.openMap_platform(this.oolaga.source.location_name)
                // this.openMap(this.oolaga.source.location_name,null);
            }
        });
        alert.present();
    };
    Myoolaga.prototype.confirmPickup1 = function () {
        var _this = this;
        var alert = this.modalCtrl.create(Alert, { olaga: null, alert: 'confirmPickup1', locations: this.locations });
        alert.onDidDismiss(function (data) {
            _this.submit();
            if (data == 'no') {
            }
            else if (data == 'yes') {
                if (_this.locations == 2) {
                    _this.openMap_platform(_this.oolaga.destination.location_name);
                    // this.openMap(this.oolaga.source,this.oolaga.destination);
                }
                else {
                    _this.openMap_platform(_this.oolaga.way_point1.location_name);
                    // this.openMap(this.oolaga.source,this.oolaga.way_point1);
                }
            }
        });
        alert.present();
    };
    Myoolaga.prototype.confirmPickup2 = function () {
        var _this = this;
        var alert = this.modalCtrl.create(Alert, { olaga: null, alert: 'confirmPickup2', locations: this.locations });
        alert.onDidDismiss(function (data) {
            _this.submit();
            if (data == 'no') {
            }
            else if (data == 'yes') {
                if (_this.locations == 3) {
                    _this.openMap_platform(_this.oolaga.destination.location_name);
                    // this.openMap(this.oolaga.way_point1,this.oolaga.destination);
                }
                else {
                    _this.openMap_platform(_this.oolaga.way_point2.location_name);
                    // this.openMap(this.oolaga.way_point1,this.oolaga.way_point2);
                }
            }
        });
        alert.present();
    };
    Myoolaga.prototype.confirmPickup3 = function () {
        var _this = this;
        var alert = this.modalCtrl.create(Alert, { olaga: null, alert: 'confirmPickup3', locations: this.locations });
        alert.onDidDismiss(function (data) {
            _this.submit();
            if (data == 'no') {
            }
            else if (data == 'yes') {
                _this.openMap_platform(_this.oolaga.destination.location_name);
                // this.openMap(this.oolaga.way_point2,this.oolaga.destination);
            }
        });
        alert.present();
    };
    Myoolaga.prototype.droplocation = function () {
        var _this = this;
        var alert = this.modalCtrl.create(Alert, { olaga: null, alert: 'dropLocation', locations: this.locations });
        alert.onDidDismiss(function (data) {
            if (data == 'no') {
            }
            else if (data == 'yes') {
                _this.submit();
                // this.openMap(this.oolaga.destination,null);
            }
        });
        alert.present();
    };
    Myoolaga.prototype.endOolaga = function () {
        var _this = this;
        if (this.oolaga.service.id == 7) {
            var alert_3 = this.modalCtrl.create(Alert, { olaga: null, alert: 'endoolaga', locations: this.locations });
            alert_3.onDidDismiss(function (data) {
                if (data == 'no') {
                    console.log('No');
                }
                else if (data == 'yes') {
                    _this.submit();
                }
            });
            alert_3.present();
        }
        else if (this.oolaga.service.id != 7) {
            var alert_4 = this.modalCtrl.create(Alert, { olaga: null, alert: 'endoolaga', locations: this.locations });
            alert_4.onDidDismiss(function (data) {
                if (data == 'no') {
                    console.log('No');
                }
                else if (data == 'yes') {
                    _this.submit();
                }
            });
            alert_4.present();
        }
    };
    Myoolaga.prototype.openMapButton = function () {
        if (this.oolaga.service.id == 7) {
            if (this.oolaga.track_status == 'start_oolaga' || this.oolaga.track_status == 'confirm_meet_up_location') {
                this.openMap_platform(this.oolaga.source.location_name);
                // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.source.location_name);
                // this.openMap(this.oolaga.source,null);
            }
        }
        else if (this.oolaga.service.id != 7) {
            if (this.oolaga.track_status == 'start_oolaga') {
                this.openMap_platform(this.oolaga.source.location_name);
                // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.source.location_name);
                // this.openMap(this.oolaga.source,null);
            }
            else if (this.oolaga.track_status == 'confirm_pickup_1') {
                if (this.locations == 2) {
                    this.openMap_platform(this.oolaga.destination.location_name);
                    // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.destination.location_name);
                    // this.openMap(this.oolaga.source,this.oolaga.destination);
                }
                else {
                    this.openMap_platform(this.oolaga.way_point1.location_name);
                    // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.way_point1.location_name);
                    // this.openMap(this.oolaga.source,this.oolaga.way_point1);
                }
            }
            else if (this.oolaga.track_status == 'confirm_pickup_2') {
                if (this.locations == 3) {
                    this.openMap_platform(this.oolaga.destination.location_name);
                    // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.destination.location_name);
                    // this.openMap(this.oolaga.way_point1,this.oolaga.destination);
                }
                else {
                    this.openMap_platform(this.oolaga.way_point2.location_name);
                    // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.way_point2.location_name);
                    // this.openMap(this.oolaga.way_point1,this.oolaga.way_point2);
                }
            }
            else if (this.oolaga.track_status == 'confirm_pickup_3') {
                this.openMap_platform(this.oolaga.destination.location_name);
                // window.open("https://www.google.com/maps/search/?api=1&query="+this.oolaga.destination.location_name);
                // this.openMap(this.oolaga.way_point2,this.oolaga.destination);
            }
            else {
            }
        }
    };
    Myoolaga.prototype.openMap_platform = function (value) {
        if (this.device.platform.toUpperCase() === "ANDROID") {
            window.open("https://www.google.com/maps/search/?api=1&query=" + value);
        }
        else if (this.device.platform.toUpperCase() === "IOS") {
            window.open("http://maps.apple.com/?daddr=" + value + "&z=10&t=k", "_system");
        }
    };
    Myoolaga.prototype.openMap = function (location1, location2) {
        this.navCtrl.push(Map, { location1: location1, location2: location2, status: this.oolaga.track_status });
    };
    Myoolaga.prototype.openMessage = function (value, image, name) {
        var msg = this.modalCtrl.create(MessageOpen, { id: value, image: image, name: name });
        msg.present();
    };
    Myoolaga.prototype.withdrowOolaga = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Êtes-vous certain de vouloir annuler votre projet?',
            buttons: [{
                    text: 'NO',
                    handler: function () {
                    }
                }, {
                    text: 'YES',
                    handler: function () {
                        var cancelpage = _this.modalCtrl.create(Canceloolaga, { oolaga: _this.oolaga });
                        cancelpage.present();
                        cancelpage.onDidDismiss(function (data) {
                            if (data && data.status == 'hello') {
                                console.log(data);
                                _this.navCtrl.pop();
                            }
                        });
                        // let loading = this.loadingCtrl.create();
                        // Observable.of(loading).flatMap(loading => loading.present())
                        //  .flatMap(data => this.securityProvider.cancelOolaga(this.oolaga.id,JSON.parse(this.oolaga.helper_id)))
                        //  .subscribe(data =>loading.dismiss().then(() =>{
                        //        console.log(data);
                        //        if(data.response){
                        //          this.navCtrl.pop();
                        //        }else{
                        //        }
                        //     }),
                        //    error=>{    
                        //        console.log(error);
                        //   })
                    }
                }]
        });
        alert.present();
    };
    Myoolaga = __decorate([
        Component({
            selector: 'page-myoolaga',
            templateUrl: 'myoolaga.html',
        }),
        __metadata("design:paramtypes", [Device,
            SecurityProvider,
            TranslateService,
            LoadingController,
            ModalController,
            AlertController,
            NavController,
            NavParams])
    ], Myoolaga);
    return Myoolaga;
}());
export { Myoolaga };
//# sourceMappingURL=myoolaga.js.map