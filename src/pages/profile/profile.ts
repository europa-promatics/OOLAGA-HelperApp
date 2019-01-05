import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController,LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/userProvider'
import { SecurityProvider } from '../../providers/securityProvider'
import { ENV } from '../../app/env'
import { Observable} from "rxjs/Rx";
import { Camera,CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PopoverController } from 'ionic-angular';
import { PopOver } from '../pop-over/pop-over';
// const FileTransfer = new Transfer(); //---------mobile code
// declare var FileTransfer //-------browser code
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
	img
	img1
	total_count
	
  data=null;
  env=ENV.mainApi
  requestdata
  constructor(public securityProvider:SecurityProvider,private camera: Camera,public loadingCtrl:LoadingController,private transfer: FileTransfer,public actionSheetCtrl: ActionSheetController,public userProvider:UserProvider,public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.requestdata={}
  }
  ionViewDidLoad() {
  	this.img='http://18.188.229.2/oolaga-french/public/img/helperfiles/' + this.userProvider.user.image;
  	
    console.log('ionViewDidLoad Profile');
    this.requestdata.user_id=this.userProvider.user.id
    var loading = this.loadingCtrl.create();
    this.securityProvider.get_user_data()
    .subscribe
    Observable.of(loading).flatMap(loading => loading.present())
     .flatMap(data => this.securityProvider.get_user_data())
     .subscribe(data =>loading.dismiss().then(() =>{
           console.log(data);
           if(data.response){
			   this.total_count=data.oolaga_count;
             this.data=data.data;
             if(this.data.vehicle_image){
			 this.img1='http://18.188.229.2/oolaga-french/public/img/helperfiles/'+ this.data.vehicle_image;
			 }
			 // this.oolaga.track_status=data.message
             // if(data.message=='end_oolaga'){
             //   this.navCtrl.pop();
             // }
           }else{
           }
        }),
       error=>{    
           console.log(error);
      })

  }
   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOver);
    popover.present({
      ev: myEvent
    });
  }
  checkNumber(value){
	
	  if(value){
    return Math.round(parseInt(value))
	  }else{
		  return 0;
	  }
  }

  changePic(){
      /* const actionSheet = this.actionSheetCtrl.create({
         title: 'Upload Option',
         buttons: [
           {
             text: 'Camera',
             icon:'ios-camera-outline',
             role: 'destructive',
             handler: () => {
                 this.picOption(1)
             }
           },
           {
             text: 'Gallery',
             icon:'ios-image-outline',
             role: 'destructive',
             handler: () => {
               this.picOption(2)
             }
           },
           {
             text: 'Cancel',
             icon:'md-close',
             role: 'cancel',
             handler: () => {
             }
           }
         ]
       });
       actionSheet.present(); */
	   
	  
  }
  picOption(value){
	const fileTransfer: FileTransferObject = this.transfer.create();
	// fileTransfer.abort();
    // FileTransfer = new Transfer();//------------browser code
    let data={
      id:this.userProvider.user.id,
      pic:''
    }
    if(value==1){
     // alert('1')
      this.camera.getPicture({
          quality: 75,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          encodingType: this.camera.EncodingType.JPEG,
          targetHeight:500,
          targetWidth:500,
          saveToPhotoAlbum: false
      }).then((imageData) => {
        // alert('2')
          this.img = "data:image/jpeg;base64," + imageData;
          localStorage['profile_pic'] = this.img;
          this.requestdata.image=this.img;
          // this.postimageone()
          this.postimagetwo()
       //    var options: FileUploadOptions= {
       //      fileKey: 'file',
     		// fileName: 'name.jpg',
     		//  chunkedMode: false,
       //      mimeType: "image/jpg"
       //    }

          //  alert('3')
          // fileTransfer.upload(this.img, ENV.mainApi+"/webservicefileupload1/" + this.userProvider.user.id ,options)
          //  .then(data => {
          //     alert('4')
          //    console.log(JSON.stringify(data));
          //  }, (err) => {
          //     alert('5')
          //    console.log(JSON.stringify(err))
          //  })
      }, (err) => {})
    }else if (value==2){
      // alert('6')
      this.camera.getPicture({
          quality: 75,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          encodingType: this.camera.EncodingType.JPEG,
          targetHeight:500,
          targetWidth:500,
          saveToPhotoAlbum: false
        }).then((imageData) => {
         ///  alert('7')
          this.img = "data:image/jpeg;base64," + imageData;
          localStorage['profile_pic'] = this.img;
          this.requestdata.image=this.img;
        //  this.postimageone()
          this.postimagetwo()
       //    var options: FileUploadOptions = {
		     // fileKey: 'file',
		     // fileName: 'name.jpg',
		     //  chunkedMode: false,
       //      mimeType: "image/jpg"
       //    }
          //  alert('8')
          // fileTransfer.upload(this.img, ENV.mainApi+"/webservicefileupload1/" + this.userProvider.user.id ,options)
          //  .then(data => {
          //     alert('9')
          //    console.log("data",JSON.stringify(data));
          //  }, (err) => {
          //    console.log("err",JSON.stringify(err))
          //  })
        }, (err) => {})
    }
  }
  postimageone(){
    let loading = this.loadingCtrl.create();
    Observable.of(loading).flatMap(loading => loading.present())
    .flatMap(() => this.securityProvider.postImagedemoServer(this.requestdata))
    .subscribe(data=>{
      console.log(data)
      loading.dismiss();
    })

  }
   postimagetwo(){
    let loading = this.loadingCtrl.create();
    Observable.of(loading).flatMap(loading => loading.present())
    .flatMap(() => this.securityProvider.postImage(this.requestdata))
    .subscribe(data=>{
      console.log(data)
      loading.dismiss();
    })
    
  }
  
  getLastName(name){
	  return name.charAt(0);
  }
}
