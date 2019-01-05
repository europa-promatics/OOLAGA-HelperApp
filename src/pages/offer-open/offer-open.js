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
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Alert } from '../alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import { UserProvider } from '../../providers/userProvider';
import { SecurityProvider } from '../../providers/securityProvider';
import { ENV } from "../../app/env";
import { OpenItemPic } from '../open-item-pic/open-item-pic';
var OfferOpen = /** @class */ (function () {
    function OfferOpen(userProvider, securityProvider, alertCtrl, translateService, loadingCtrl, navCtrl, modalCtrl, navParams) {
        this.userProvider = userProvider;
        this.securityProvider = securityProvider;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.show = false;
        this.contenttick = false;
        this.selected_item = 0;
        this.oolaga = this.navParams.get('oolaga');
        this.my = ENV.mainApi;
    }
    OfferOpen.prototype.contentshow = function () {
        this.contenttick = true;
        alert(this.contenttick);
    };
    OfferOpen.prototype.ionViewDidEnter = function () {
        this.securityProvider.viewOolaga({ helper_id: this.userProvider.user.id, oolaga_id: this.oolaga.id }).subscribe(function (data) {
        }, function (err) {
        });
    };
    OfferOpen.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OfferOpen');
    };
    OfferOpen.prototype.openPic = function (pic) {
        pic = this.my + '/public/frontend/img/addImage/' + pic;
        var model = this.modalCtrl.create(OpenItemPic, { pic: pic });
        model.present();
    };
    OfferOpen.prototype.acceptOolaga = function () {
    };
    OfferOpen.prototype.placebid = function () {
        var _this = this;
        var profileModal = this.modalCtrl.create(Alert, { olaga: this.oolaga, alert: 'bidding' });
        profileModal.present();
        profileModal.onDidDismiss(function (data) {
            if (data == false) { }
            else {
                _this.amount = data;
                console.log(data);
                if (_this.amount > 0) {
                    var loading_1 = _this.loadingCtrl.create();
                    Observable.of(loading_1).flatMap(function (loading) { return loading.present(); })
                        .flatMap(function () { return _this.securityProvider.enterbid(_this.oolaga.id, _this.userProvider.user.id, _this.amount); })
                        .subscribe(function (data) {
                        console.log(JSON.stringify(data.message));
                        if (data.message == 'success!') {
                            loading_1.dismiss();
                            var alert_1 = _this.alertCtrl.create({
                                message: "Votre offre a été soumise avec succès",
                                buttons: ['Ok']
                            });
                            alert_1.present();
                            _this.navCtrl.pop();
                        }
                        else {
                            alert('error');
                            loading_1.dismiss();
                        }
                    });
                }
                else {
                    var alert_2 = _this.alertCtrl.create({
                        message: "S'il vous plaît entrer une offre valide",
                        buttons: ['Ok']
                    });
                    alert_2.present();
                }
            }
        });
    };
    OfferOpen = __decorate([
        Component({
            selector: 'page-offer-open',
            templateUrl: 'offer-open.html',
        }),
        __metadata("design:paramtypes", [UserProvider,
            SecurityProvider, AlertController,
            TranslateService,
            LoadingController,
            NavController, ModalController,
            NavParams])
    ], OfferOpen);
    return OfferOpen;
}());
export { OfferOpen };
//# sourceMappingURL=offer-open.js.map