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
import { Observable } from "rxjs/Rx";
import { TranslateService } from '@ngx-translate/core';
var Ragister = /** @class */ (function () {
    function Ragister(securityProvider, translateService, loadingCtrl, navCtrl, navParams) {
        this.securityProvider = securityProvider;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user_type = 1;
    }
    Ragister.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Ragister');
    };
    Ragister.prototype.signUp = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function () { return _this.securityProvider.ragister(_this.firstname, _this.lastname, _this.email, _this.number, _this.user_type, _this.password); })
            .subscribe(function (data) {
            console.log(data);
            loading.dismiss();
        });
    };
    Ragister = __decorate([
        Component({
            selector: 'page-ragister',
            templateUrl: 'ragister.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider,
            TranslateService,
            LoadingController,
            NavController,
            NavParams])
    ], Ragister);
    return Ragister;
}());
export { Ragister };
//# sourceMappingURL=ragister.js.map