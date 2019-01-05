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
import { TranslateService } from '@ngx-translate/core';
import { SecurityProvider } from '../../providers/securityProvider';
import { Observable } from "rxjs/Rx";
import { Validators, FormBuilder } from '@angular/forms';
var Contactus = /** @class */ (function () {
    function Contactus(formBuilder, navCtrl, navParams, loadingCtrl, translateService, securityProvider, alertCtrl) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.securityProvider = securityProvider;
        this.alertCtrl = alertCtrl;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.details = formBuilder.group({
            name: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            description: ['', Validators.compose([Validators.maxLength(100), Validators.minLength(0), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
        });
    }
    Contactus.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Contactus');
    };
    Contactus.prototype.Contactus = function () {
        var _this = this;
        if (this.details.valid) {
            var loading_1 = this.loadingCtrl.create();
            Observable.of(loading_1).flatMap(function (loading) { return loading.present(); })
                .flatMap(function () { return _this.securityProvider.contactus(_this.details.controls["name"].value, _this.details.controls["email"].value, _this.details.controls["description"].value, 222); })
                .subscribe(function (data) {
                console.log(data.response);
                loading_1.dismiss();
                if (data.response == true) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Merci',
                        message: "Nous vous contacterons dès que possible ",
                        buttons: ['Ok']
                    });
                    alert_1.present();
                }
                else if (data.response == false) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Pardon',
                        message: "Entrez tous les champs",
                        buttons: ['Ok']
                    });
                    alert_2.present();
                }
            });
        }
        else if (!this.details.controls["name"].valid) {
            var alert_3 = this.alertCtrl.create({
                message: " Veuillez saisir un nom avec au moins 3 caractères ",
                buttons: ['Ok']
            });
            alert_3.present();
        }
        else if (!this.details.controls["email"].valid) {
            var alert_4 = this.alertCtrl.create({
                message: " Veuillez saisir une adresse email valide",
                buttons: ['Ok']
            });
            alert_4.present();
        }
        else {
            var alert_5 = this.alertCtrl.create({
                message: "Veuillez saisir un message",
                buttons: ['Ok']
            });
            alert_5.present();
        }
    };
    Contactus = __decorate([
        Component({
            selector: 'page-contactus',
            templateUrl: 'contactus.html',
        }),
        __metadata("design:paramtypes", [FormBuilder,
            NavController,
            NavParams,
            LoadingController,
            TranslateService,
            SecurityProvider,
            AlertController])
    ], Contactus);
    return Contactus;
}());
export { Contactus };
//# sourceMappingURL=contactus.js.map