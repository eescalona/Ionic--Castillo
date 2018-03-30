import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { ProyectsPage } from '../proyects/proyects';
import { DescargarPage } from '../descargar/descargar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	private isApp;
	public data: any[];
	public items = [{ id:'0', url:'http://castillococinas.es/data/uploads/slide/1.jpg'},
					{ id:'1', url:'http://castillococinas.es/data/uploads/armarios-benno/slide-armario-132.jpg'},
					{ id:'2', url:'http://castillococinas.es/data/uploads/slide/3.jpg'},
					{ id:'3', url:'http://castillococinas.es/data/uploads/armarios-benno/slide-benno2012-15.jpg'},
					{ id:'4', url:'http://castillococinas.es/data/uploads/slide/6.jpg'},
					{ id:'5', url:'http://castillococinas.es/data/uploads/slide/7777.jpg'}];

	constructor(private modalCtrl: ModalController, public navCtrl: NavController, 
				 public navParams: NavParams) { 			
	}

	ionViewWillEnter(){
		this.isApp = (!document.URL.startsWith('http') || document.URL.startsWith('http://localhost:8100'));
		if(!this.isApp){
			this.showDescargar();
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
		this.navCtrl.setRoot(ProyectsPage,{ typeParam: typeParam});
	}

	showDescargar(){
		let modal = this.modalCtrl.create(DescargarPage);
	  	modal.present();
	}
}