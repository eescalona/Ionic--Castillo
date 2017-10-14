import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { GalleryModal } from 'ionic-gallery-modal';

import {CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';
import { ProyectsPage } from '../proyects/proyects';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CastilloServiceProvider]
})
export class HomePage {

	public data: any[];
	public items = [{ id:'0', url:''}];

  	constructor(private iab: InAppBrowser, private callNumber: CallNumber, private modalCtrl: ModalController,
  				public navCtrl: NavController, public navParams: NavParams, private servicio: CastilloServiceProvider) {   				
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad HomePage');
      	//this.getSlides();
      	this.errSlides()
  	}

  	getSlides(){
      	console.log('getSlides');
    	this.servicio.getSlides().map(res => res.json()).subscribe(
      		data => {
        		this.data = data.data;
        	},
        	err => this.errSlides(),  
        	() => this.makeSlides()
    	);
  	}

  	errSlides(){
  		console.log('getSlides error ')
  		this.items = [
		{ id:'0', url:'http://castillococinas.es/data/uploads/slide/1.jpg'},
		{ id:'1', url:'http://castillococinas.es/data/uploads/armarios-benno/slide-armario-132.jpg'},
		{ id:'2', url:'http://castillococinas.es/data/uploads/slide/3.jpg'},
		{ id:'3', url:'http://castillococinas.es/data/uploads/armarios-benno/slide-benno2012-15.jpg'},
		{ id:'4', url:'http://castillococinas.es/data/uploads/slide/6.jpg'},
		{ id:'5', url:'http://castillococinas.es/data/uploads/slide/7777.jpg'}];
  	}

  	makeSlides(){
  		console.log('getSlides ok')
  		for (let i = 0; i < this.data.length; i+=1) { //iterate images
  			this.items[i] = this.data[i];
  			this.items[i].id = i.toString();
		 }
  	}

	itemTapped(item) {
		let modal = this.modalCtrl.create(GalleryModal, {
      		photos: this.items,
      		initialSlide: item,
		});

		modal.present();
	}

	navigate(typeParam:string) {
		this.navCtrl.push(ProyectsPage,{ typeParam: typeParam});
	}

	navigateFooter(typeParam:string) {

		if(typeParam == 'call'){

			this.callNumber.callNumber("34952360495", true)
  				.then(() => this.navCtrl.push(ProyectsPage,{ typeParam: 'then'}))
  				.catch(() => console.log('callNumber.isAvailable error'));
		}
		if(typeParam == 'mail'){
			const browser = this.iab.create(`mailto:mueblescastillo@hotmail.es?Subject=Cocinas Castillo App`, '_system');
      		browser.close();
		}
		if(typeParam == 'facebook'){
			const browser = this.iab.create("https://www.facebook.com/cocinasyarmarioscastillo", '_system' );
      		browser.close();
		}
		if(typeParam == 'twitter'){
			const browser = this.iab.create("https://twitter.com/CocinasCastillo", '_system' );
      		browser.close();
		}
		if(typeParam == 'youtube'){
			const browser = this.iab.create("https://www.youtube.com/channel/UCpk-yArbevL6B5EBxk7xYyw?guided_help_flow=3", '_system' );
      		browser.close();
		}
		if(typeParam == 'chrome'){
			const browser = this.iab.create("http://castillococinas.es/", '_system' );
      		browser.close();
		}
		if(typeParam == 'compass'){
			const browser = this.iab.create("https://www.google.es/maps/place/COCINAS+CASTILLO/@36.7097173,-4.4850416,17z/data=!3m1!4b1!4m5!3m4!1s0xd72f0b261d84181:0x64e3b9b726fe05b1!8m2!3d36.7097173!4d-4.4828529", '_system' );
      		browser.close();
		}
	}
}
