import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProyectsPage } from '../pages/proyects/proyects';
import { DetailPage } from '../pages/detail/detail';
import { AboutPage } from '../pages/about/about';
import { MyFooterComponent } from '../components/my-footer/my-footer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { InAppBrowser} from '@ionic-native/in-app-browser'
import { CallNumber } from '@ionic-native/call-number';

import {GalleryModalModule, GalleryModalHammerConfig} from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CastilloServiceProvider } from '../providers/castillo-service/castillo-service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    ProyectsPage,
    AboutPage,
    MyFooterComponent
  ],
  imports: [
    BrowserModule,
    GalleryModalModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    ProyectsPage,
    AboutPage,
    MyFooterComponent
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    CallNumber,
    SplashScreen,
    {provide: HAMMER_GESTURE_CONFIG,
    useClass: GalleryModalHammerConfig},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CastilloServiceProvider
  ]
})
export class AppModule {}
