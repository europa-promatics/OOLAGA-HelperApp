var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, } from '@angular/core';
import { Content, Refresher } from 'ionic-angular';
import { NavController, NavParams, Events, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider } from '../../providers/securityProvider';
import { TranslateService } from '@ngx-translate/core';
import { Timetracker } from '../../providers/timetracker';
import { MessageOpen } from '../message-open/message-open';
import { Myoolaga } from '../myoolaga/myoolaga';
var Home = /** @class */ (function () {
    function Home(modalCtrl, alertCtrl, loadingCtrl, translateService, securityProvider, navCtrl, navParams, userProvider, events, locationTracker) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.securityProvider = securityProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.events = events;
        this.locationTracker = locationTracker;
    }
    Home.prototype.doRefresh = function (refresh, value) {
        this.loadData(refresh, value);
    };
    Home.prototype.ionViewDidLoad = function () {
        //this.locationTracker.startTracking();
        console.log('ionViewDidLoad Home');
        var data = JSON.parse(localStorage['userdata']);
        this.userProvider.createNew();
        this.userProvider.user.email = data.email;
        this.userProvider.user.city = data.city;
        this.userProvider.user.firstname = data.firstname;
        this.userProvider.user.id = data.id;
        this.userProvider.user.image = data.image;
        this.userProvider.user.lastname = data.lastname;
        this.userProvider.user.number = data.number;
        this.userProvider.user.user_type = data.user_type;
        this.events.publish('user:login', true);
        this.userProvider.consoleData();
    };
    Home.prototype.loadData = function (refresh, value) {
        var _this = this;
        this.securityProvider.getmyolaga(this.userProvider.user.id)
            .subscribe(function (data) {
            _this.myoolaga = data.data;
            _this.myoolaga.reverse();
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
    Home.prototype.ionViewDidEnter = function () {
        this.refresher._top = this.content.contentTop + 'px';
        this.refresher.state = 'ready';
        this.refresher._onEnd();
    };
    Home.prototype.openMyoolaga = function (value) {
        var _this = this;
        var oolaga = this.modalCtrl.create(Myoolaga, { data: value });
        oolaga.onDidDismiss(function () {
            _this.ionViewDidEnter();
        });
        oolaga.present();
    };
    Home.prototype.openMessage = function (value, image, name) {
        var _this = this;
        var msg = this.modalCtrl.create(MessageOpen, { id: value, image: image, name: name });
        msg.onDidDismiss(function () {
            _this.ionViewDidEnter();
        });
        msg.present();
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], Home.prototype, "content", void 0);
    __decorate([
        ViewChild(Refresher),
        __metadata("design:type", Refresher)
    ], Home.prototype, "refresher", void 0);
    Home = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            AlertController, LoadingController,
            TranslateService,
            SecurityProvider,
            NavController,
            NavParams,
            UserProvider,
            Events,
            Timetracker])
    ], Home);
    return Home;
}());
export { Home };
//# sourceMappingURL=home.js.map