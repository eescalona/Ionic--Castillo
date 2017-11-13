import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';


@IonicPage()
@Component({
  selector: 'page-servicios',
  templateUrl: 'servicios.html',
})
export class ServiciosPage {

  public items = [{ id:'0', url:'http://castillococinas.es/data/uploads/diez-razones-para-elegir-antalia.jpg'}];
  
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
