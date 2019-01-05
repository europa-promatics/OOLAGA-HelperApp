import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
/**
 * Generated class for the Map page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class Map {
	map;
	marker
	location1
	location2;
	m
	status;
  constructor(public geolocation:Geolocation,public navCtrl: NavController, public navParams: NavParams) {
  	this.marker=[];
  	this.location1=this.navParams.get('location1')
  	this.location2=this.navParams.get('location2')
  	this.status=this.navParams.get('status')
  }


  ionViewDidLoad() {
  	if(this.location1!=null){
	  	var pin =new google.maps.LatLng(this.location1.latitude,this.location1.longitude)
		var icon1 = {
		        url: 'img/pin-1.png', // url
		        scaledSize: new google.maps.Size(33, 46), // scaled size
		    };
		var marker = new google.maps.Marker({
		  position: pin,
		  icon:icon1,
		});
		this.marker.push(marker);
  	}
  	if(this.location2!=null){
  		var pin =new google.maps.LatLng(this.location2.latitude,this.location2.longitude)
		var icon1 = {
		        url: 'img/pin-2.png', // url
		        scaledSize: new google.maps.Size(33, 46), // scaled size
		    };
		var marker = new google.maps.Marker({
		  position: pin,
		  icon:icon1,
		});
		this.marker.push(marker);
  	}
    console.log('ionViewDidLoad Map');
    let mapp = document.getElementById('locationMap')
    this.map = new google.maps.Map(mapp,{
      center: {lat:25,lng: 35},
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
      });
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapp.classList.add('show-map');
      google.maps.event.trigger(mapp, 'resize');
      });
      for (var i = this.marker.length - 1; i >= 0; i--) {
      	this.marker[i].setMap(this.map)
      }
		var bounds = new google.maps.LatLngBounds();
	        for(var i=0;i<this.marker.length;i++) {
	             bounds.extend(this.marker[i].getPosition());
	        }
	      this.map.setCenter(bounds.getCenter());
	      this.map.fitBounds(bounds);
      // this.track();
  }
  ionViewWillLeave(){
  	for (var i = this.marker.length - 1; i >= 0; i--) {
      	this.marker[i].setMap(null)
      }
  }
  track(){
  	this.geolocation.getCurrentPosition().then((position) => {
  		var pin =new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
		var icon1 = {
		        url: 'img/delivery-truck.png', // url
		        scaledSize: new google.maps.Size(30,30), // scaled size
		    };
		var marker = new google.maps.Marker({
		  position: pin,
		  icon:icon1,
		});
	  	if(this.marker[this.marker.length-1]!=null){
	  	this.marker[this.marker.length-1].setMap(null);
	  	}
		this.marker[this.marker.length-1]=marker;
		this.marker[this.marker.length-1].setMap(this.map);
		setInterval(()=>{this.track()},5000)
  	})
  }

}
