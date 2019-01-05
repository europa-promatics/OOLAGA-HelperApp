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
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Login } from '../login/login';
/**
 * Generated class for the Start page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Start = /** @class */ (function () {
    function Start(navCtrl, menuCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.menu = menuCtrl;
        this.menu.enable(false, "mymenu");
    }
    Start.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Start');
    };
    Start.prototype.login = function () {
        this.navCtrl.push(Login);
    };
    Start = __decorate([
        Component({
            selector: 'page-start',
            templateUrl: 'start.html',
        }),
        __metadata("design:paramtypes", [NavController, MenuController, NavParams])
    ], Start);
    return Start;
}());
export { Start };
//# sourceMappingURL=start.js.map