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
import { Home } from '../home/home';
import { Auction } from '../auction/auction';
import { Notification } from '../notification/notification';
import { MenuController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { Payment } from '../payment/payment';
import { SecurityProvider } from '../../providers/securityProvider';
var Tabs = /** @class */ (function () {
    function Tabs(securityProvider, events, userProvider, menuCtrl) {
        this.securityProvider = securityProvider;
        this.events = events;
        this.userProvider = userProvider;
        this.menuCtrl = menuCtrl;
        this.tab1Root = Home;
        this.tab2Root = Auction;
        this.tab3Root = Notification;
        this.tab4Root = Payment;
        this.tab5Root = Home;
        this.noti = null;
        this.events.subscribe('notification', function (data) {
            // this.noti++;
        });
        this.notifications();
    }
    Tabs.prototype.openNoti = function () {
        this.noti = null;
    };
    Tabs.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    Tabs.prototype.ionViewDidEnter = function () {
        var _this = this;
        setInterval(function () {
            // this.noti++;
            _this.notifications();
        }, 30000);
    };
    Tabs.prototype.notifications = function () {
        var _this = this;
        this.securityProvider.checkNotifications(this.userProvider.user.id)
            .subscribe(function (data) {
            data.unread == 0 ? _this.noti = null : _this.noti = data.unread;
        });
    };
    Tabs = __decorate([
        Component({
            selector: 'page-tabs',
            templateUrl: 'tabs.html',
        }),
        __metadata("design:paramtypes", [SecurityProvider, Events, UserProvider, MenuController])
    ], Tabs);
    return Tabs;
}());
export { Tabs };
//# sourceMappingURL=tabs.js.map