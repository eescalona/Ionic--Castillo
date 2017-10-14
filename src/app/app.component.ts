import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProyectsPage } from '../pages/proyects/proyects';
import { AboutPage } from '../pages/about/about';
import { HtmlPage } from '../pages/html/html';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(private iab: InAppBrowser, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage},
      { title: 'Cocinas', component: ProyectsPage},
      { title: 'Armarios', component: ProyectsPage},
      { title: 'Catalogos', component: ProyectsPage},
      { title: 'Servicios', component: HtmlPage},
      { title: 'Blog', component: HtmlPage},
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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Cocinas' || page.title == 'Armarios' || page.title == 'Catalogos')
    {
      this.nav.setRoot(page.component, { typeParam: page.title});
    }else{
      if(page.title == 'Servicios')
      {
        // TODO Servicios y Blog
        this.nav.push(page.component, { typeParam: page.title});

        const browser = this.iab.create("http://castillococinas.es/producto-y-servicios/", '_system' );
        browser.close();
  
      }else{
        if(page.title == 'Blog')
        {
          const browser = this.iab.create("http://castillococinas.es/blog/", '_system' );
          browser.close();
        }else{
          this.nav.setRoot(page.component);     
        }     
      }
    }  
  }



}
