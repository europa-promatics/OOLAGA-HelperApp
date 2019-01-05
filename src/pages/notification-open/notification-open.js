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
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider } from '../../providers/securityProvider';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from "rxjs/Rx";
import { ViewController } from 'ionic-angular';
var NotificationOpen = /** @class */ (function () {
    function NotificationOpen(navCtrl, navParams, loading, translateService, securityProvider, viewCtrl, userProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.translateService = translateService;
        this.securityProvider = securityProvider;
        this.viewCtrl = viewCtrl;
        this.userProvider = userProvider;
        this.mynotificationdata = this.navParams.get("notydata");
    }
    NotificationOpen.prototype.deletenoty = function () {
        var _this = this;
        var loading = this.loading.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function () { return _this.securityProvider.deletenoty(_this.mynotificationdata.id); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.viewCtrl.dismiss();
        });
    };
    NotificationOpen.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationOpen');
    };
    NotificationOpen = __decorate([
        Component({
            selector: 'page-notification-open',
            templateUrl: 'notification-open.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams, LoadingController,
            TranslateService,
            SecurityProvider,
            ViewController,
            UserProvider])
    ], NotificationOpen);
    return NotificationOpen;
}());
export { NotificationOpen };
//# sourceMappingURL=notification-open.js.map