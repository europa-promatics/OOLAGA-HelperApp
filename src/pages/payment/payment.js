var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider } from '../../providers/securityProvider';
import { Content, Refresher } from 'ionic-angular';
var Payment = /** @class */ (function () {
    function Payment(userProvider, securityProvider, loadingCtrl, navCtrl, navParams) {
        this.userProvider = userProvider;
        this.securityProvider = securityProvider;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.earning = new Earning();
        this.history = [];
        this.earning.totalEarning = 0;
        this.earning.pendingDeposite = 0;
        this.earning.sheduledEarnings = 0;
    }
    Payment.prototype.doRefresh = function (refresh, value) {
        this.loadData(refresh, value);
    };
    Payment.prototype.loadData = function (refresh, value) {
        var _this = this;
        this.history.push({ earning: 22, name: 'a', date: '7-7-7', time: '02:05 AM' }, { earning: 55, name: 'b', date: '7-7-7', time: '02:05 AM' });
        console.log('ionViewDidLoad Payment');
        this.securityProvider.payments(this.userProvider.user.id)
            .subscribe(function (data) {
            console.log(data.earning);
            // console.log(data.history)
            // this.history=data.history;
            _this.earning = data.earning;
            if (value) {
                refresh.complete();
            }
        }, function (err) {
            if (value) {
                refresh.complete();
            }
        });
    };
    Payment.prototype.ionViewDidEnter = function () {
        this.refresher._top = this.content.contentTop + 'px';
        this.refresher.state = 'ready';
        this.refresher._onEnd();
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Payment.prototype, "content", void 0);
    __decorate([
        ViewChild(Refresher),
        __metadata("design:type", Refresher)
    ], Payment.prototype, "refresher", void 0);
    Payment = __decorate([
        Component({
            selector: 'page-payment',
            templateUrl: 'payment.html',
        }),
        __metadata("design:paramtypes", [UserProvider, SecurityProvider, LoadingController, NavController, NavParams])
    ], Payment);
    return Payment;
}());
export { Payment };
var Earning = /** @class */ (function () {
    function Earning() {
    }
    return Earning;
}());
//# sourceMappingURL=payment.js.map