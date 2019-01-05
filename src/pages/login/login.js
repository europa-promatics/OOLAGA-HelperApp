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
import { NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { SecurityProvider } from '../../providers/securityProvider';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { Observable } from "rxjs/Rx";
import { FCM } from '@ionic-native/fcm';
import { Tabs } from '../tabs/tabs';
var Login = /** @class */ (function () {
    function Login(device, fcm, menuCtrl, loadingCtrl, alertCtrl, navCtrl, navParams, securityProvider, translateService) {
        this.device = device;
        this.fcm = fcm;
        this.menuCtrl = menuCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.securityProvider = securityProvider;
        this.translateService = translateService;
        this.debug = false;
        this.menu = menuCtrl;
        this.menu.enable(false, "mymenu");
    }
    Login.prototype.ionViewWillLoad = function () {
        var _this = this;
        localStorage.clear();
        //--------------------mobile code----------------------
        this.uuid = this.device.uuid;
        this.platform = this.device.platform;
        this.fcm.getToken().then(function (token) {
            console.log('Token saved:', token);
            _this.tok = token;
            localStorage['token'] = _this.tok;
        });
        //-----------------------------------------------------
        console.log('ionViewDidLoad Login');
    };
    Login.prototype.login = function () {
        var _this = this;
        //---------------------browser code--------------------
        // this.platform='Browser';
        // this.uuid='5546464656546546'
        // localStorage['token']='sfsfhskfhksdhfjkhfksdfgvsdffhguyegey87ye837mccnk,'
        //------------------------------------------------------
        var loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function () { return _this.securityProvider.login(_this.user, _this.pass, _this.uuid, _this.platform); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.response == true) {
                localStorage['login'] = true;
                localStorage['userdata'] = JSON.stringify(data.user_info);
                _this.menu.enable(true, "mymenu");
                _this.navCtrl.setRoot(Tabs);
            }
            else {
                localStorage['login'] = false;
                _this.user = '';
                _this.pass = '';
                var alert_1 = _this.alertCtrl.create({
                    title: _this.translateService.instant('action.alert'),
                    message: _this.translateService.instant('action.invalid'),
                    buttons: [_this.translateService.instant('action.ok')]
                });
                alert_1.present();
            }
            console.log(data);
        });
        // let alert = this.alertCtrl.create({
        //   title:'check',
        //   message:'phone_id:'+this.uuid+',platform:'+this.platform+',password:'+this.pass+',username:'+this.user+',push_token:'+localStorage['token'],
        //   buttons:[{text:'ok', handler:()=>{
        //     }}]
        // })
        // alert.present();
    };
    Login = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [Device,
            FCM,
            MenuController,
            LoadingController,
            AlertController,
            NavController,
            NavParams,
            SecurityProvider,
            TranslateService])
    ], Login);
    return Login;
}());
export { Login };
//# sourceMappingURL=login.js.map