import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProyectsPage } from '../pages/proyects/proyects';
import { AboutPage } from '../pages/about/about';
import { ServiciosPage } from '../pages/servicios/servicios';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  isIOS: any = false;

  constructor(public platform: Platform,  private splashScreen: SplashScreen,
    public statusBar: StatusBar) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage},
      { title: 'Mis favoritos', component: ProyectsPage},
      { title: 'Cocinas', component: ProyectsPage},
      { title: 'Armarios', component: ProyectsPage},
      { title: 'Catalogos', component: ProyectsPage},
      { title: 'Promociones', component: ProyectsPage},            
      { title: 'Servicios', component: ServiciosPage},
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
    if (this.platform.is('ios')) {
      // This will only when on iOS
      this.isIOS = true;
    }
    
  }

  openPage(page) {
    if(page.title == 'Cocinas' || page.title == 'Armarios' || page.title == 'Catalogos'
        || page.title == 'Promociones' || page.title == 'Mis favoritos' || page.title == 'Blog')
    {
      this.nav.setRoot(page.component, {typeParam: page.title});
    }else{
      this.nav.setRoot(page.component);  
    }  
  }
}
