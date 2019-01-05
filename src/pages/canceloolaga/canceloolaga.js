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
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SecurityProvider } from '../../providers/securityProvider';
/**
 * Generated class for the Canceloolaga page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Canceloolaga = /** @class */ (function () {
    function Canceloolaga(alertCtrl, securityProvider, loadingCtrl, viewCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.securityProvider = securityProvider;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._1st = false;
        this._2nd = false;
        this._3rd = false;
        this._4th = false;
        this.reasons = [];
    }
    Canceloolaga.prototype.help = function () {
        var alert = this.alertCtrl.create({
            subTitle: "Veuillez garder à l’esprit que des frais d’annulation peuvent s’appliquer.",
            message: 'Merci de vous référer à notre politique d’annulation disponible dans nos conditions générales de vente.',
            buttons: ['OK']
        });
        alert.present();
    };
    Canceloolaga.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad Canceloolaga');
        this.oolaga = this.navParams.get('oolaga');
        console.log(this.oolaga);
        var loading = this.loadingCtrl.create();
        Observable.of(loading).flatMap(function (loading) { return loading.present(); })
            .flatMap(function (data) { return _this.securityProvider.getReasons(); })
            .subscribe(function (data) { return loading.dismiss().then(function () {
            if (data.response) {
                console.log(data.message);
                _this.reasons = data.message;
            }
            else {
            }
        }); }, function (error) {
            console.log(error);
        });
    };
    Canceloolaga.prototype.submit = function () {
        var _this = this;
        if (this._1st || this._2nd || this._3rd || this._4th) {
            var a = [];
            if (this._1st) {
                a.push(this.reasons[0].id);
            }
            if (this._2nd) {
                a.push(this.reasons[1].id);
            }
            if (this._3rd) {
                a.push(this.reasons[2].id);
            }
            if (this._4th) {
                a.push(this.reasons[3].id);
            }
            console.log(a);
            var loading_1 = this.loadingCtrl.create();
            var oolaga_1 = JSON.stringify({
                oolaga_id: this.oolaga.id,
                helper_id: JSON.parse(this.oolaga.helper_id),
                reasons: a.toString()
            });
            Observable.of(loading_1).flatMap(function (loading) { return loading.present(); })
                .flatMap(function (data) { return _this.securityProvider.cancelOolaga(oolaga_1); })
                .subscribe(function (data) { return loading_1.dismiss().then(function () {
                if (data.response) {
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: "YVotre projet a été annulé. Veuillez garder à l’esprit que des frais d’annulation peuvent s’appliquer.",
                        message: ' Merci de vous référer à notre politique d’annulation disponible dans nos conditions générales de vente.',
                        buttons: ['OK']
                    });
                    alert_1.present();
                    alert_1.onDidDismiss(function () {
                        _this.viewCtrl.dismiss({ status: 'hello' });
                    });
                }
                else {
                    //          let alert = this.alertCtrl.create({
                    //          	subTitle:"Your oolaga was cancelled. Please keep in mind to ensure",
                    //          	message:'You will be charged 20% of this oolaga / or not $xxx ( see cancellation policy )',
                    //          	buttons:['OK']
                    //          })
                    //          alert.present();
                    //          alert.onDidDismiss(()=>{
                    // this.viewCtrl.dismiss({status:'hello'});
                    //          })
                }
            }); }, function (error) {
                console.log(error);
            });
        }
        else {
            var alert_2 = this.alertCtrl.create({
                message: ' Veuillez sélectionner un motif d’annulation',
                buttons: ['OK']
            });
            alert_2.present();
        }
    };
    Canceloolaga = __decorate([
        Component({
            selector: 'page-canceloolaga',
            templateUrl: 'canceloolaga.html',
        }),
        __metadata("design:paramtypes", [AlertController, SecurityProvider, LoadingController, ViewController, NavController, NavParams])
    ], Canceloolaga);
    return Canceloolaga;
}());
export { Canceloolaga };
//# sourceMappingURL=canceloolaga.js.map