import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {

  public items = [{ id:'0', url:'http://cocinascastillo.escalonasoftware.com/public/images/assets/diez-razones-para-elegir-antalia.jpg'}];
  
  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  itemTapped() {
		let modal = this.modalCtrl.create(GalleryModal, {
      		photos: this.items,
      		initialSlide: 0,
		});

		modal.present();
	}
}
