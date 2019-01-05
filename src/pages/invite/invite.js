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
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
var Invite = /** @class */ (function () {
    function Invite(navCtrl, navParams, socialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
    }
    Invite.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Invite');
    };
    Invite.prototype.share = function (value) {
        if (value == 1) {
            this.socialSharing.shareViaFacebook('https://ionicframework.com/docs/native/social-sharing')
                .then(function () {
            }).catch(function () {
                alert("Partager via fb n'est pas possible");
                // 
            });
        }
        if (value == 2) {
            this.socialSharing.shareViaTwitter('https://ionicframework.com/docs/native/social-sharing')
                .then(function () {
            }).catch(function () {
                alert("Partager via fb n'est pas possible");
            });
        }
        if (value == 3) {
            this.socialSharing.shareViaWhatsApp('https://ionicframework.com/docs/native/social-sharing')
                .then(function () {
            }).catch(function () {
                alert("Partager via fb n'est pas possible");
            });
        }
        if (value == 4) {
            this.socialSharing.canShareVia('https://ionicframework.com/docs/native/social-sharing')
                .then(function () {
            }).catch(function () {
                alert("Partager via fb n'est pas possible");
            });
        }
    };
    Invite = __decorate([
        Component({
            selector: 'page-invite',
            templateUrl: 'invite.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, SocialSharing])
    ], Invite);
    return Invite;
}());
export { Invite };
//# sourceMappingURL=invite.js.map