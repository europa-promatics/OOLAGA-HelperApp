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
import { Nav, Platform, AlertController, LoadingController, Events, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../providers/userProvider';
import { SecurityProvider } from '../providers/securityProvider';
import { Timetracker } from '../providers/timetracker';
import { ENV } from "./env";
import { About } from '../pages/about/about';
import { Profile } from '../pages/profile/profile';
import { Tabs } from '../pages/tabs/tabs';
import { Start } from '../pages/start/start';
import { Contactus } from '../pages/contactus/contactus';
import { Statistics } from '../pages/statistics/statistics';
import { Payment } from '../pages/payment/payment';
import { Invite } from '../pages/invite/invite';
import { Settings } from '../pages/settings/settings';
import { How } from '../pages/how/how';
import { MessageOpen } from '../pages/message-open/message-open';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';
import { ParticularOolaga } from '../pages/particular-oolaga/particular-oolaga';
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
// const config: BackgroundGeolocationConfig = {
//             desiredAccuracy: 10,
//             stationaryRadius: 20,
//             distanceFilter: 30,
//             debug: true, //  enable this hear sounds for background-geolocation life-cycle.
//             stopOnTerminate: false, // enable this to clear background location settings when the app terminates
//     };
var MyApp = /** @class */ (function () {
    function MyApp(/*private backgroundGeolocation: BackgroundGeolocation,*/ geolocation, 
    // private backgroundMode: BackgroundMode,
    device, fcm, alertController, events, platform, statusBar, splashScreen, translateService, modalCtrl, userProvider, locationTracker, loadingCtrl, securityProvider) {
        this.geolocation = geolocation;
        this.device = device;
        this.fcm = fcm;
        this.alertController = alertController;
        this.events = events;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translateService = translateService;
        this.modalCtrl = modalCtrl;
        this.userProvider = userProvider;
        this.locationTracker = locationTracker;
        this.loadingCtrl = loadingCtrl;
        this.securityProvider = securityProvider;
        this.img = '';
        this.name = "name";
        this.enable = true;
        this.count = 0;
        this.initializeApp();
        this.pages = [
            { title: 'Your Oolagas', component: Tabs, icon: 'img/home.png' },
            { title: 'Statistics', component: Statistics, icon: 'img/statistics.png' },
            { title: 'Payments', component: Payment, icon: 'img/credit-card.png' },
            { title: 'Invite', component: Invite, icon: 'img/invite.png' },
            { title: 'Settings', component: Settings, icon: 'img/setting.png' },
            { title: 'How it works', component: How, icon: 'img/howitworks.png' },
            { title: 'About Us', component: About, icon: 'img/about.png' },
            { title: 'Contact Us', component: Contactus, icon: 'img/contactus.png' }
        ];
    }
    MyApp.prototype.notification = function (data) {
        if (data.type == 'msg') {
            var msg = this.modalCtrl.create(MessageOpen, { id: data.user_id, image: data.user_image, name: data.user_name });
            msg.present();
        }
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.translateService.setDefaultLang(ENV.language);
            _this.translateService.use(ENV.language);
            // this.backgroundGeolocation.configure(config)
            //   .subscribe((location: BackgroundGeolocationResponse) => {
            //     alert(JSON.stringify(location));
            //     // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
            //     // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
            //     // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
            //     this.backgroundGeolocation.finish(); // FOR IOS ONLY
            //   });
            //   this.backgroundGeolocation.start();
            //------------------mobile code----------------------
            // this.fcm.subscribeToTopic('oolaga');
            // this.fcm.onNotification().subscribe(data=>{
            //   if(data.wasTapped){
            //     console.log("Received in background");
            //     this.notification(data)
            //   } else {
            //     if(this.enable){
            //       let a = this.alertController.create({
            //         title:data.title,
            //         message:data.body,
            //         buttons:['ok']
            //       })
            //       a.present();
            //     }
            //     console.log("Received in foreground");
            //   };
            // })
            // -------------mukul 18-4-2018------
            // this.fcm.onNotification().subscribe(data => {
            //     if(data.wasTapped){
            //         alert("Received in background");
            //         alert(JSON.stringify(data));
            //         this.nav.setRoot(ParticularOolaga,{oolagaId:68});
            //     } else {
            //         alert("Received in foreground");
            //         alert(JSON.stringify(data));
            //         // this.nav.setRoot(ParticularOolaga);
            //     };
            // });
            //-----------------------------------------------------
            //     this.events.publish('notification')
            if (localStorage['login'] == "true" || localStorage['login'] == true) {
                _this.rootPage = ParticularOolaga;
            }
            else {
                _this.rootPage = ParticularOolaga;
            }
            _this.events.subscribe('user:login', function (data) {
                _this.img = ENV.mainApi + '/public/frontend/img/profile/' + _this.userProvider.user.image;
                _this.name = _this.userProvider.user.firstname;
            });
            _this.events.subscribe('enablePopup', function (data) {
                _this.enable = data;
            });
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // this.backgroundMode.enable();
            // alert(JSON.stringify(this.backgroundMode.isEnabled()))
            // alert(JSON.stringify(this.backgroundMode.isActive()))
            setInterval(function () {
                if (_this.userProvider.user.id != undefined) {
                    return _this.geolocation.getCurrentPosition().then(function (position) {
                        console.log(position);
                        _this.securityProvider.track(_this.userProvider.user.id, position.coords.latitude, position.coords.longitude).subscribe(function (data) {
                        });
                    }, function (err) {
                        console.log(err);
                    });
                }
            }, 5000);
        });
    };
    MyApp.prototype.openPage = function (page) {
        if (page.title != 'Dashboard') {
            this.nav.push(page.component);
        }
    };
    MyApp.prototype.logout = function () {
        //this.locationTracker.stopTracking();
        delete this.userProvider.user;
        this.userProvider.createNew();
        localStorage.clear();
        this.nav.setRoot(Start);
    };
    MyApp.prototype.open_profile = function () {
        this.nav.push(Profile);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Geolocation,
            Device, FCM,
            AlertController,
            Events,
            Platform,
            StatusBar,
            SplashScreen,
            TranslateService,
            ModalController,
            UserProvider,
            Timetracker,
            LoadingController,
            SecurityProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map