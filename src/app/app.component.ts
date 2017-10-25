import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProyectsPage } from '../pages/proyects/proyects';
import { AboutPage } from '../pages/about/about';
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

	options : InAppBrowserOptions = {
		location : 'yes',//Or 'no' 
		hidden : 'no', //Or  'yes'
		clearcache : 'yes',
		clearsessioncache : 'yes',
		zoom : 'no',//Android only ,shows browser zoom controls 
		hardwareback : 'yes',
		mediaPlaybackRequiresUserAction : 'no',
		shouldPauseOnSuspend : 'no', //Android only 
		closebuttoncaption : 'Close', //iOS only
		disallowoverscroll : 'no', //iOS only 
		toolbar : 'yes', //iOS only 
		enableViewportScale : 'no', //iOS only 
		allowInlineMediaPlayback : 'no',//iOS only 
		presentationstyle : 'pagesheet',//iOS only 
		fullscreen : 'yes',//Windows only    
  };
  
  constructor(private iab: InAppBrowser, public platform: Platform,  private splashScreen: SplashScreen,
    public statusBar: StatusBar) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage},
      { title: 'Cocinas', component: ProyectsPage},
      { title: 'Armarios', component: ProyectsPage},
      { title: 'Catalogos', component: ProyectsPage},
      { title: 'Promociones', component: ProyectsPage},            
      { title: 'Servicios', component: ProyectsPage},
      { title: 'Blog', component: ProyectsPage},
      { title: 'Conocenos', component: AboutPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title == 'Cocinas' || page.title == 'Armarios' 
        || page.title == 'Catalogos' || page.title == 'Promociones')
    {
      this.nav.setRoot(page.component, { typeParam: page.title});
    }else{
      if(page.title == 'Servicios')
      {
        this.iab.create("http://castillococinas.es/producto-y-servicios/", '_self', this.options);
      }else{
        if(page.title == 'Blog')
        {
          this.iab.create("http://castillococinas.es/blog/", '_self', this.options);
        }else{
          this.nav.setRoot(page.component);     
        }     
      }
    }  
  }
}
