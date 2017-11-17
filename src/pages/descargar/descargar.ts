import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
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
  
  constructor(public navCtrl: NavController, public view: ViewController, private iab: InAppBrowser) {
  }

	openDescargar(type: string){
		if(type=='ios'){
			this.iab.create('https://www.apple.com/itunes/charts/free-apps/', '_system', this.options);
		}else{
			this.iab.create('https://play.google.com/store/apps/details?id=escalonasoftware.cocinascastillo', '_system', this.options);      
		}
  }
  
  back(){
    this.view.dismiss();
  }
}
