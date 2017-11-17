import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { Storage } from '@ionic/Storage';

import { PresupuestoPage } from '../presupuesto/presupuesto';
import {CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers: [CastilloServiceProvider]
})

export class DetailPage {
	public item = {image_url: '', id: 0, title:''};
	public itemId;
	public favorites;
	private isFavorites: boolean;
	public grid: any[][];
	public items: any[];
	private sharing = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, 
							public ref: ChangeDetectorRef, private servicio: CastilloServiceProvider, 
							public toast: ToastController, public storage: Storage) {
  	this.itemId = navParams.get("item_id");
		this.favorites = navParams.get("favorites"); 
		this.isFavorites = navParams.get("isFavorites");   

		this.getItem();

  	console.log('constructor DetailPage');
  }

  getItem(){
    if(this.isFavorites){
			console.log('getFavorite');
      this.servicio.getFavorite(this.itemId,this.favorites).map(res => res.json()).subscribe(
        data => {
					this.item = data.data;
					this.getGallery();
          },
        err => console.log('getFavorite error'),
        () => console.log('getFavorite ok')
			);
    }else{
      console.log('getItem');
    	this.servicio.getItem(this.itemId).map(res => res.json()).subscribe(
      		data => {
						this.item = data.data;
						console.log('getItem data')
						this.getGallery();
						console.log('getItem gallery')
        		},
        	err => console.log('getItem error'),
					() => console.log('getItem ok')
      );
    }
  }

  getGallery(){
      console.log('getGallery');
    	this.servicio.getGallery(this.item.id).map(res => res.json()).subscribe(
      		data => {
        		this.items = data.data;
        	},
        	err => {console.log('getGallery error'); },  
        	() => this.getGrid()
    	);
  }

  getGrid(){
		let makeGrid = Array(Math.ceil((this.items.length-1)/2));

  	let rowNum = 0; //counter to iterate over the rows in the grid

	 for (let i = 1; i < this.items.length; i+=2) { //iterate images

			makeGrid[rowNum] = Array(2); //declare two elements per row													
      if (this.items[i]) { //check file URI exists
			  makeGrid[rowNum][0] = this.items[i]; //insert image
        makeGrid[rowNum][0].id = i;
      }													
       if (i+1 < this.items.length && this.items[i+1]) { //repeat for the second image
			  makeGrid[rowNum][1] = this.items[i+1];
				makeGrid[rowNum][1].id = i+1;
       }else{
				makeGrid[rowNum][1] = { url: '', }; //insert url 
       }
       rowNum++; //go on to the next row
		}
		this.grid = makeGrid; 
  }

	itemTapped(item) {
		let modal = this.modalCtrl.create(GalleryModal, {
      		photos: this.items,
      		initialSlide: item,
		});

		modal.present();
	}

	arrowTapped(newid) {
	  this.navCtrl.pop();
    this.navCtrl.push(DetailPage,{ item_id: newid, favorites: this.favorites, isFavorites: this.isFavorites});
  } 
  
  presupuestoTapped(){
    this.navCtrl.push(PresupuestoPage,{ subject: 'Solicita Presupuesto: ' + this.item.title, title: 'Solicitar Presupuesto'});
  }

  isThisFavorite(id){
		console.log('isItemFavorite ->' + id);
		if(this.favorites.indexOf(id) != -1){
					return true;
				}else{
					return false;
				}
	}

	setFavorites(id){
		if(this.isThisFavorite(id)){
			//Delete item to bd
			console.log('data deleted '+ id);			
    	this.storage.get('myFavorites').then((data) => {
    	  if(data != null)
    	  {
    	    data.splice(data.indexOf(id),1);
					this.storage.set('myFavorites', data);
					this.favorites= data;
					this.ref.detectChanges();

					this.toast.create({
						message: `Eliminado de Mis Favoritos`,
						duration: 3000
					}).present();

    	  }
			});
		}else{
			//Add item to bd
			console.log('data added '+ id);			
    	this.storage.get('myFavorites').then((data) => {
    	  if(data != null)
    	  {
    	    data.push(id);
    	    this.storage.set('myFavorites', data);
					this.favorites= data;
					this.ref.detectChanges();
					
    	  }
    	  else
    	  {
    	    let array = [];
    	    array.push(id);
    	    this.storage.set('myFavorites', array);
					this.favorites= array;
					this.ref.detectChanges();
    	  }
			});
			
			this.toast.create({
				message: `Añadida a Mis Favoritos`,
				duration: 3000
			}).present();
		}
	}

	setSharing(){
		this.sharing = !this.sharing;
	}

	isSharing(){
		return this.sharing;
	}
}
