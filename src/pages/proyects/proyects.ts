import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { DetailPage } from '../detail/detail';

import {CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';


@IonicPage()
@Component({
  selector: 'page-proyects',
  templateUrl: 'proyects.html',
  providers: [CastilloServiceProvider]
})

export class ProyectsPage {
	public title:string;
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
	public foundRepos;

  	constructor(public navCtrl: NavController, public navParams: NavParams, 
		private servicio: CastilloServiceProvider, private iab: InAppBrowser, 
		public platform: Platform) {
  		this.title = navParams.get("typeParam");
  	}
	
  	ionViewWillEnter() {
      this.getProyects();
  	  console.log('ionViewDidLoad ProyectsPage');
  	}

	itemTapped(event, item) {
    if(this.title == 'Catalogos' || this.title == 'Promociones'){
			if(item.extension == 'pdf' && this.platform.is('android'))
			{
				this.iab.create(item.url, '_system', this.options);
			}else{
				this.iab.create(item.url, '_self', this.options);
			}      
    }else{
        this.navCtrl.push(DetailPage,{ item: item});
    }
	}

  getProyects(){
    this.servicio.getProyects(this.title).map(res => res.json()).subscribe(
      data => {
        this.foundRepos = data.data;
        },
        err => console.log('getRepos error'),
        () => console.log('getRepos succes')
    );
  }

}
