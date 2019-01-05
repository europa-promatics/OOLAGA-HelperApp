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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';
var Alert = /** @class */ (function () {
    function Alert(navCtrl, viewCtrl, navParams, modalCtrl, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.myolaga = this.navParams.get('olaga');
        this.option = this.navParams.get('alert');
        this.locations = this.navParams.get('locations');
        console.log(JSON.stringify(this.myolaga));
    }
    Alert.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Alert');
    };
    Alert.prototype.cancel = function () {
        this.viewCtrl.dismiss(false);
    };
    Alert.prototype.startOolaga = function (value) {
        this.viewCtrl.dismiss(value);
    };
    Alert.prototype.submit = function () {
        if (parseInt(this.price) >= 25) {
            this.viewCtrl.dismiss(this.price);
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'oops..',
                subTitle: "S'il vous plaît entrer minimum 25 $",
                buttons: ['Ok']
            });
            alert_1.present();
        }
    };
    Alert = __decorate([
        Component({
            selector: 'page-alert',
            templateUrl: 'alert.html',
        }),
        __metadata("design:paramtypes", [NavController, ViewController, NavParams, ModalController, AlertController, LoadingController])
    ], Alert);
    return Alert;
}());
export { Alert };
//# sourceMappingURL=alert.js.map