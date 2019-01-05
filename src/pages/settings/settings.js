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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SecurityProvider } from '../../providers/securityProvider';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/userProvider';
import { Observable } from "rxjs/Rx";
var Settings = /** @class */ (function () {
    function Settings(navCtrl, navParams, securityProvider, loadingCtrl, translateService, userProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.securityProvider = securityProvider;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.userProvider = userProvider;
        this.distance = '5';
        this.stairs = false;
        this.elevator = false;
        this.on_working_hour = false;
        this.days = [{ day: 'Lundi', selection: 'active_0', status: "0" },
            { day: 'Mardi', selection: 'active_0', status: "0" },
            { day: 'Mercredi', selection: 'active_0', status: "0" },
            { day: 'Jeudi', selection: 'active_0', status: "0" },
            { day: 'Vendredi', selection: 'active_0', status: "0" },
            { day: 'Samedi', selection: 'active_0', status: "0" },
            { day: 'Dimanche', selection: 'active_0', status: "0" }];
    }
    Settings.prototype.selectDay = function (value) {
        console.log(value);
        for (var i = 0; i < this.days.length; i++) {
            if (value == this.days[i]) {
                if (this.days[i].selection == 'active_1') {
                    this.days[i].selection = 'active_0';
                    this.days[i].status = "0";
                }
                else if (this.days[i].selection == 'active_0') {
                    this.days[i].selection = 'active_1';
                    this.days[i].status = "1";
                }
            }
        }
    };
    Settings.prototype.saveData = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function () { return _this.securityProvider.saveSettings(_this.distance, _this.stairs, _this.elevator, _this.days, _this.zip_code, _this.on_working_hour, _this.push); })
            .subscribe(function (data) {
            console.log(data);
            _this.navCtrl.pop();
            loading.dismiss();
        });
    };
    Settings.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad Settings');
        var loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function () { return _this.securityProvider.getSettingsData(_this.userProvider.user.id); })
            .subscribe(function (data) {
            if (data.response) {
                _this.push = data.push_status == 'Active' ? true : false;
                _this.distance = data.availability.distance;
                if (data.availability.stairs == 0) {
                    _this.stairs = false;
                }
                else {
                    _this.stairs = true;
                }
                if (data.availability.elevator == 0) {
                    _this.elevator = false;
                }
                else {
                    _this.elevator = true;
                }
                if (data.availability.on_working_hour == 0) {
                    _this.on_working_hour = false;
                }
                else {
                    _this.on_working_hour = true;
                }
                _this.zip_code = data.availability.zip_code;
                _this.days = [{ day: 'Lundi', selection: 'active_0', status: data.availability.monday },
                    { day: 'Mardi', selection: 'active_0', status: data.availability.tuesday },
                    { day: 'Mercredi', selection: 'active_0', status: data.availability.wednesday },
                    { day: 'Jeudi', selection: 'active_0', status: data.availability.thursday },
                    { day: 'Vendredi', selection: 'active_0', status: data.availability.friday },
                    { day: 'Samedi', selection: 'active_0', status: data.availability.saturday },
                    { day: 'Dimanche', selection: 'active_0', status: data.availability.saturday }];
                console.log(_this.days);
                for (var i = 0; i < 7; i++) {
                    if (_this.days[i].status == "0") {
                        _this.days[i].selection = 'active_0';
                    }
                    else {
                        _this.days[i].selection = 'active_1';
                    }
                }
            }
            else {
                _this.distance = '1';
                _this.stairs = false;
                _this.elevator = false;
                _this.days = [{ day: 'Lundi', selection: 'active_0', status: "0" },
                    { day: 'Mardi', selection: 'active_0', status: "0" },
                    { day: 'Mercredi', selection: 'active_0', status: "0" },
                    { day: 'Jeudi', selection: 'active_0', status: "0" },
                    { day: 'Vendredi', selection: 'active_0', status: "0" },
                    { day: 'Samedi', selection: 'active_0', status: "0" },
                    { day: 'Dimanche', selection: 'active_0', status: "0" }];
            }
            console.log(data);
            loading.dismiss();
        });
    };
    Settings = __decorate([
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            SecurityProvider,
            LoadingController,
            TranslateService,
            UserProvider])
    ], Settings);
    return Settings;
}());
export { Settings };
//# sourceMappingURL=settings.js.map