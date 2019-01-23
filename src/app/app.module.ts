import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
// import { BackgroundMode } from '@ionic-native/background-mode';
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
// import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Geolocation } from '@ionic-native/geolocation';
import { FCM }from '@ionic-native/fcm';
import { Device } from '@ionic-native/device'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Timetracker } from '../providers/timetracker';
import { SecurityProvider } from '../providers/securityProvider';
import { UserProvider } from '../providers/userProvider';
import { ParticularOolaga } from '../pages/particular-oolaga/particular-oolaga'
import { FeedbackPage } from '../pages/feedback/feedback'
import { Home } from '../pages/home/home';
import { OfferOpen } from '../pages/offer-open/offer-open';
import { Auction } from '../pages/auction/auction';
import { About } from '../pages/about/about'
import { Profile }from '../pages/profile/profile';
import { Tabs } from '../pages/tabs/tabs';
import { Login }from '../pages/login/login';
import { Contactus } from '../pages/contactus/contactus';
import { Statistics} from '../pages/statistics/statistics';
import { Payment} from '../pages/payment/payment';
import { Invite } from '../pages/invite/invite';
import { Settings } from '../pages/settings/settings';
import { How } from '../pages/how/how';
import { Alert } from '../pages/alert/alert'
import { MessageOpen } from '../pages/message-open/message-open';
import { Message } from '../pages/message/message';
import { Notification } from '../pages/notification/notification';
import { NotificationOpen } from '../pages/notification-open/notification-open'
import { Ragister } from '../pages/ragister/ragister';
import { Myoolaga } from '../pages/myoolaga/myoolaga';
import { Map}from '../pages/map/map';
import { PopOver}from '../pages/pop-over/pop-over';
import { Earnings } from '../pages/earnings/earnings'
import { Canceloolaga } from '../pages/canceloolaga/canceloolaga';
import { LaborOnlyPlaceBid } from '../pages/labor-only-place-bid/labor-only-place-bid'
import { OpenItemPic } from '../pages/open-item-pic/open-item-pic';
import { Start } from '../pages/start/start'
import { ForgotPassword } from '../pages/forget_password/forget_password';
import {InfoFilter,TimeMomentFormat,TimerforCancelOolaga,DateConvert} from '../pipes/time-monent-format';
import { Timer,Chatfilter,ObjectTimer} from '../pipes/timer';
import * as moment from 'moment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Timer,ObjectTimer,TimeMomentFormat,TimerforCancelOolaga,Chatfilter,InfoFilter,DateConvert,//pipes
    Home,
	FeedbackPage,
    OfferOpen,
    About,
    Auction,
    Profile,
    ForgotPassword,
    Tabs,
    Login,
    Contactus,
    Statistics,
    Payment,
    Invite,
    Settings,
    How,
    Alert,
    MessageOpen,
    Message,
    Notification,
    NotificationOpen,
    Ragister,
    Myoolaga,
    Map,
    Earnings,
    Canceloolaga,
    LaborOnlyPlaceBid,
    OpenItemPic,
    Start,
    ParticularOolaga,
	PopOver
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    OfferOpen,
    About,
    Auction,
    Profile,
    Tabs,
    Login,
    Contactus,
    Statistics,
    Payment,
    Invite,
    Settings,
    How,
    Alert,
    ForgotPassword,
	PopOver,
    MessageOpen,
    Message,
    Notification,
    NotificationOpen,
    Ragister,
    Myoolaga,
    Map,
    Earnings,
    Canceloolaga,
    LaborOnlyPlaceBid,
	FeedbackPage,
    OpenItemPic,
    Start,
    ParticularOolaga,
	//PopOver
  ],
  providers: [
      Geolocation,
      // BackgroundGeolocation,
      // BackgroundMode,
      Timetracker ,
      SocialSharing,    
      StatusBar,
      SplashScreen,
      UserProvider,
      SecurityProvider,
      FCM,Device,
      Camera,
      FileTransfer,
File,
      {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
