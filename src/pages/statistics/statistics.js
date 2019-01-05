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
import { SecurityProvider } from '../../providers/securityProvider';
import { Observable } from 'rxjs/Rx';
import { UserProvider } from '../../providers/userProvider';
var Statistics = /** @class */ (function () {
    function Statistics(userProvider, alertCtrl, loadingCtrl, securityProvider, navCtrl, navParams) {
        this.userProvider = userProvider;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.options = [{ name: 'Les 7 derniers jours', value: 0 }, { name: 'Les 15 derniers jours', value: 1 }, { name: 'Les 30 derniers jours', value: 2 }];
        // index:number=0;
        this.curDate = new Date();
        this.curMonth = ['DECEMBRE', 'NOVEMBRE', 'OCTOBRE', 'SEPTEMBRE', 'AOÛT', 'JUILLET', 'JUIN', 'MAI', 'AVRIL', 'MARS', 'FEVRIER', 'JANVIER'];
        this.days = this.options[0];
        this.data;
        this.curMonth.reverse();
        this.curDate = this.curDate.getDate();
        this.month = new Date().getMonth();
    }
    Statistics.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad Statistics');
        var loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function () { return _this.securityProvider.getStatistics(_this.userProvider.user.id); })
            .subscribe(function (data) {
            if (data.response) {
                data.seven.lastdate.date = _this.curMonth[new Date(data.seven.lastdate.date).getMonth()] + ' ' + new Date(data.seven.lastdate.date).getDate();
                data.fifteen.lastdate.date = _this.curMonth[new Date(data.fifteen.lastdate.date).getMonth()] + ' ' + new Date(data.fifteen.lastdate.date).getDate();
                data.thirty.lastdate.date = _this.curMonth[new Date(data.thirty.lastdate.date).getMonth()] + ' ' + new Date(data.thirty.lastdate.date).getDate();
                _this.data = [data.seven, data.fifteen, data.thirty];
                _this.fulldata = data;
                console.log(_this.data);
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Oops..',
                    buttons: ['Ok']
                });
                alert_1.present();
            }
            loading.dismiss();
        }, function (error) {
            loading.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Timeout',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    Statistics = __decorate([
        Component({
            selector: 'page-statistics',
            templateUrl: 'statistics.html',
        }),
        __metadata("design:paramtypes", [UserProvider, AlertController, LoadingController, SecurityProvider, NavController, NavParams])
    ], Statistics);
    return Statistics;
}());
export { Statistics };
//# sourceMappingURL=statistics.js.map