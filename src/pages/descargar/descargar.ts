import { Component } from '@angular/core';
import { NavController, ViewController, Platform } from 'ionic-angular';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-descargar',
  templateUrl: 'descargar.html',
})

export class DescargarPage {

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
  isIOS: any = false;
  
  constructor(public navCtrl: NavController, public view: ViewController, private iab: InAppBrowser, public platform: Platform) {
		if (this.platform.is('ios')) {
      this.isIOS = true;
    }
  }

	openDescargar(type: string){
		if(type=='ios'){
			this.iab.create('https://www.apple.com/us/search/cocinas-castillo?src=globalnav', '_system', this.options);
		}else{
			this.iab.create('https://play.google.com/store/apps/details?id=escalonasoftware.cocinascastillo', '_system', this.options);      
		}
  }
  
  back(){
    this.view.dismiss();
  }
}
