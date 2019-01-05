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
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Map = /** @class */ (function () {
    function Map(geolocation, navCtrl, navParams) {
        this.geolocation = geolocation;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.marker = [];
        this.location1 = this.navParams.get('location1');
        this.location2 = this.navParams.get('location2');
        this.status = this.navParams.get('status');
    }
    Map.prototype.ionViewDidLoad = function () {
        if (this.location1 != null) {
            var pin = new google.maps.LatLng(this.location1.latitude, this.location1.longitude);
            var icon1 = {
                url: 'img/pin-1.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.marker.push(marker);
        }
        if (this.location2 != null) {
            var pin = new google.maps.LatLng(this.location2.latitude, this.location2.longitude);
            var icon1 = {
                url: 'img/pin-2.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.marker.push(marker);
        }
        console.log('ionViewDidLoad Map');
        var mapp = document.getElementById('locationMap');
        this.map = new google.maps.Map(mapp, {
            center: { lat: 25, lng: 35 },
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        });
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            mapp.classList.add('show-map');
            google.maps.event.trigger(mapp, 'resize');
        });
        for (var i = this.marker.length - 1; i >= 0; i--) {
            this.marker[i].setMap(this.map);
        }
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.marker.length; i++) {
            bounds.extend(this.marker[i].getPosition());
        }
        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
        // this.track();
    };
    Map.prototype.ionViewWillLeave = function () {
        for (var i = this.marker.length - 1; i >= 0; i--) {
            this.marker[i].setMap(null);
        }
    };
    Map.prototype.track = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var pin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var icon1 = {
                url: 'img/delivery-truck.png',
                scaledSize: new google.maps.Size(30, 30),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            if (_this.marker[_this.marker.length - 1] != null) {
                _this.marker[_this.marker.length - 1].setMap(null);
            }
            _this.marker[_this.marker.length - 1] = marker;
            _this.marker[_this.marker.length - 1].setMap(_this.map);
            setInterval(function () { _this.track(); }, 5000);
        });
    };
    Map = __decorate([
        Component({
            selector: 'page-map',
            templateUrl: 'map.html',
        }),
        __metadata("design:paramtypes", [Geolocation, NavController, NavParams])
    ], Map);
    return Map;
}());
export { Map };
//# sourceMappingURL=map.js.map