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
import { SecurityProvider } from '../../providers/securityProvider';
import { Alert } from '../alert/alert';
import { Map } from '../map/map';
import { MessageOpen } from '../message-open/message-open';
import { Observable } from "rxjs/Rx";
import { TranslateService } from '@ngx-translate/core';
import { Canceloolaga } from '../canceloolaga/canceloolaga';
import { Device } from '@ionic-native/device';
import { OpenItemPic } from '../open-item-pic/open-item-pic';
/**
 * Generated class for the ParticularOolaga page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ParticularOolaga = /** @class */ (function () {
    function ParticularOolaga(securityProvider, navCtrl, device, translateService, loadingCtrl, modalCtrl, alertCtrl, navParams) {
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.device = device;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.startOolagaButton = false;
        this.endOolagaButton = false;
        this.confirmPickupButton1 = false;
        this.confirmPickupButton2 = false;
        this.confirmPickupButton3 = false;
        this.completeOolaga = false;
        this.selected_item = 0;
        this.start_enable = false;
        this.oolagaId = navParams.get('oolagaId');
    }
    ParticularOolaga.prototype.checkstart = function () {
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
    ParticularOolaga.prototype.ngOnInit = function () {
        var data = {
            // id:this.oolagaId;
            oolaga_id: 96
        };
        this.securityProvider.getOolagaDetailsById(data).subscribe(function (data) {
            alert(JSON.stringify(data.data));
            var a = JSON.stringify(data.data);
            var b = JSON.parse(a);
            alert(b.id);
            // if (data.response==true) {
            //    this.oolaga=data.data;
            //     let timer=this.oolaga.date
            //     timer=timer.split('-')[0]+'-'+timer.split('-')[1]+'-20'+timer.split('-')[2]
            //     this.startTime = timer.split('-').reverse().toString().replace(',','-').replace(',','-')+'T'+this.oolaga.first_time+':00.000Z';
            //     this.startTime = Date.parse(this.startTime.replace('T',' ').replace('.000Z',''))
            //     this.currentTime = Date.parse(new Date().toString());
            //     this.my=ENV.mainApi
            //     if(this.oolaga.way_point1==null && this.oolaga.way_point2==null){
            //       this.locations=2;
            //     }
            //     else if(this.oolaga.way_point1!=null && this.oolaga.way_point2==null){
            //       this.locations=3;
            //     }
            //     else if(this.oolaga.way_point1!=null && this.oolaga.way_point2!=null){
            //       this.locations=4;
            //     }
            //     this.checkstart();
            // }
        }, function (err) {
            console.log(err);
        });
    };
    ParticularOolaga.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParticularOolaga');
    };
    ParticularOolaga.prototype.openPic = function (pic) {
        pic = this.my + '/public/frontend/img/addImage/' + pic;
        var model = this.modalCtrl.create(OpenItemPic, { pic: pic });
        model.present();
    };
    ParticularOolaga.prototype.submit = function () {
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
    ParticularOolaga.prototype.help = function () {
        var alert = this.alertCtrl.create({
            message: 'This is an active Oolaga you have accepted to perform.  Press “Start Oolaga” to initiate the job.  You can also quickly map it and chat with the customer by pressing on the icons at the bottom of the screen',
            buttons: [{ text: 'OK' }]
        });
        alert.present();
    };
    ParticularOolaga.prototype.startOolaga = function () {
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
    ParticularOolaga.prototype.confirmMeetupLocation = function () {
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
    ParticularOolaga.prototype.confirmPickup1 = function () {
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
    ParticularOolaga.prototype.confirmPickup2 = function () {
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
    ParticularOolaga.prototype.confirmPickup3 = function () {
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
    ParticularOolaga.prototype.droplocation = function () {
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
    ParticularOolaga.prototype.endOolaga = function () {
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
    ParticularOolaga.prototype.openMapButton = function () {
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
    ParticularOolaga.prototype.openMap_platform = function (value) {
        if (this.device.platform.toUpperCase() === "ANDROID") {
            window.open("https://www.google.com/maps/search/?api=1&query=" + value);
        }
        else if (this.device.platform.toUpperCase() === "IOS") {
            window.open("http://maps.apple.com/?daddr=" + value + "&z=10&t=k", "_system");
        }
    };
    ParticularOolaga.prototype.openMap = function (location1, location2) {
        this.navCtrl.push(Map, { location1: location1, location2: location2, status: this.oolaga.track_status });
    };
    ParticularOolaga.prototype.openMessage = function (value, image, name) {
        var msg = this.modalCtrl.create(MessageOpen, { id: value, image: image, name: name });
        msg.present();
    };
    ParticularOolaga.prototype.withdrowOolaga = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Are you sure you want to cancel your oolaga',
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
    ParticularOolaga = __decorate([
        Component({
            selector: 'page-particular-oolaga',
            templateUrl: 'particular-oolaga.html',
            providers: [SecurityProvider]
        }),
        __metadata("design:paramtypes", [SecurityProvider,
            NavController,
            Device,
            TranslateService,
            LoadingController,
            ModalController,
            AlertController,
            NavParams])
    ], ParticularOolaga);
    return ParticularOolaga;
}());
export { ParticularOolaga };
//# sourceMappingURL=particular-oolaga.js.map