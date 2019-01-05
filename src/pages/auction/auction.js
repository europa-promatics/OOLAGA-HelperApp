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
import { Content, Refresher } from 'ionic-angular';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider } from '../../providers/securityProvider';
import { TranslateService } from '@ngx-translate/core';
import { OfferOpen } from '../offer-open/offer-open';
var Auction = /** @class */ (function () {
    function Auction(navCtrl, alertCtrl, loadingCtrl, modalCtrl, translateService, securityProvider, userProvider, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.translateService = translateService;
        this.securityProvider = securityProvider;
        this.userProvider = userProvider;
        this.navParams = navParams;
    }
    Auction.prototype.ionViewDidLoad = function (refresh, value) {
        console.log('ionViewDidLoad Auction');
    };
    Auction.prototype.doRefresh = function (refresh, value) {
        this.loadData(refresh, value);
    };
    Auction.prototype.checkDate = function (data) {
        if (data) {
            var z = new Date().toISOString().split('T')[0].split('-')[0].slice(2);
            var a = new Date().toISOString().split('T')[0].split('-')[2] + '-' + new Date().toISOString().split('T')[0].split('-')[1] + '-' + z;
            if (data == a) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    Auction.prototype.loadData = function (refresh, value) {
        var _this = this;
        this.securityProvider.getOolaga(this.userProvider.user.id)
            .subscribe(function (data) {
            if (data.response) {
                _this.oolaga = data.oolagas;
                _this.oolaga.reverse();
            }
            else {
                _this.oolaga = [];
            }
            if (value) {
                refresh.complete();
            }
        }),
            function (error) {
                if (value) {
                    refresh.complete();
                }
                var alert = _this.alertCtrl.create({
                    title: 'Timeout',
                    buttons: ['Ok']
                });
                alert.present();
            };
    };
    Auction.prototype.ionViewDidEnter = function () {
        this.refresher._top = this.content.contentTop + 'px';
        this.refresher.state = 'ready';
        this.refresher._onEnd();
    };
    Auction.prototype.openOffer = function (value) {
        var _this = this;
        var msg = this.modalCtrl.create(OfferOpen, { oolaga: value });
        msg.present();
        msg.onDidDismiss(function (data) {
            _this.ionViewDidEnter();
        });
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Auction.prototype, "content", void 0);
    __decorate([
        ViewChild(Refresher),
        __metadata("design:type", Refresher)
    ], Auction.prototype, "refresher", void 0);
    Auction = __decorate([
        Component({
            selector: 'page-auction',
            templateUrl: 'auction.html',
        }),
        __metadata("design:paramtypes", [NavController,
            AlertController,
            LoadingController,
            ModalController,
            TranslateService,
            SecurityProvider,
            UserProvider,
            NavParams])
    ], Auction);
    return Auction;
}());
export { Auction };
//# sourceMappingURL=auction.js.map