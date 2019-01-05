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
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider } from '../../providers/securityProvider';
import { TranslateService } from '@ngx-translate/core';
import { Content, Refresher } from 'ionic-angular';
import { NotificationOpen } from '../notification-open/notification-open';
var Notification = /** @class */ (function () {
    function Notification(modalCtrl, alertCtrl, loadingCtrl, translateService, securityProvider, navCtrl, navParams, userProvider) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.test = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];
        this.notification = [];
    }
    Notification.prototype.doRefresh = function (refresh, value) {
        this.loadData(refresh, value);
    };
    Notification.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Notification');
    };
    Notification.prototype.loadData = function (refresh, value) {
        var _this = this;
        this.securityProvider.notification(this.userProvider.user.id)
            .subscribe(function (data) {
            _this.notification = data.data;
            _this.notification.reverse();
            if (value) {
                refresh.complete();
            }
        }, function (error) {
            if (value) {
                refresh.complete();
            }
        });
    };
    Notification.prototype.openNotification = function (m, a) {
        var _this = this;
        var notification = this.modalCtrl.create(NotificationOpen, { notydata: m });
        notification.onDidDismiss(function (data) {
            _this.ionViewDidEnter();
        });
        //notification.present();
    };
    Notification.prototype.ionViewDidEnter = function (refresh, value) {
        this.refresher._top = this.content.contentTop + 'px';
        this.refresher.state = 'ready';
        this.refresher._onEnd();
    };
    Notification.prototype.delete = function (index, item) {
        var _this = this;
        console.log(item);
        item.close();
        setTimeout(function () {
            _this.notification.splice(index, 1);
        }, 300);
        this.securityProvider.deleteNotification(this.notification[index].id).subscribe(function (data) {
            if (data.response) {
            }
        }, function (err) {
        });
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Notification.prototype, "content", void 0);
    __decorate([
        ViewChild(Refresher),
        __metadata("design:type", Refresher)
    ], Notification.prototype, "refresher", void 0);
    Notification = __decorate([
        Component({
            selector: 'page-notification',
            templateUrl: 'notification.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            AlertController, LoadingController,
            TranslateService,
            SecurityProvider,
            NavController,
            NavParams,
            UserProvider])
    ], Notification);
    return Notification;
}());
export { Notification };
//# sourceMappingURL=notification.js.map