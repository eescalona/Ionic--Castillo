import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';
import { PresupuestoPage } from '../presupuesto/presupuesto';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'page-design',
  templateUrl: 'design.html',
  providers: [CastilloServiceProvider]
})
export class DesignPage {

  public item = {image_url: '', id: 0, title:''};
  public itemId;
  public image;
  public imageId: number = 0;
  public images: any[];
  public items: any[];
  public IsOpen: number = 0;
	private sharing = false;
	public favorites;
  private isFavorites: boolean;
  private Combination;
  private isCombination: any[];
  private combinationTitle: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public storage: Storage,public ref: ChangeDetectorRef, public toast: ToastController,
    private modalCtrl: ModalController, private servicio: CastilloServiceProvider) {

    this.itemId = navParams.get("item_id");
		this.favorites = navParams.get("favorites"); 
    this.isFavorites = navParams.get("isFavorites");   
    
    this.getItem();
  }

  collapseList(id){

		if(this.IsOpen == id){
      this.IsOpen = 0;      
		}else{
      this.IsOpen = id;
		}
  }

  IsOpened(id){
    return id == this.IsOpen;
  }

  getItem(){
    console.log('getItem');
    this.servicio.getItem(this.itemId).map(res => res.json()).subscribe(
        data => {
          this.item = data.data;
          console.log('getItem data')
          this.getGallery();
          this.getCombination();
          console.log('getItem gallery')
          },
        err => console.log('getItem error'),
        () => console.log('getItem ok')
    );
  }

  getCombination(){
    console.log('getCombination');
    this.servicio.getCombination(this.item.id).map(res => res.json()).subscribe(
        data => {
          this.Combination = data.data;
          this.setCombnation();
        },
        err => console.log('getCombination error'),
        () => console.log('getCombination ok')
    );
  }

  setCombnation(){
    this.isCombination=[];
    for(let data of this.Combination) {
      this.isCombination.push([data.id, data.options[0].id]);
    }
  }

  getGallery(){
    console.log('getGallery');
    this.servicio.getGallery(this.item.id).map(res => res.json()).subscribe(
        data => {
          this.items = data.data;
        },
        err => {console.log('getGallery error'); },  
        () => this.getImage(this.items[0].id)
    );
  }

  itemTapped() {
		let modal = this.modalCtrl.create(GalleryModal, {
      		photos: this.images,
      		initialSlide: 0,
		});

		modal.present();
  }

  checked(type,item){
    for(let data of this.isCombination) {
      if(data[0]==type){
        data[1]=item;
      }
    }
    this.IsOpen = 0; 
    this.calculateImageId();
  }

  Ischecked(type,item){

    for(let data of this.isCombination) {
      if(data[0]==type){
        if(data[1]==item){
          return true;
        }else{
          return false;
        }
      }
    }
    return false;
  }

  calculateImageId(){
    console.log('calculateImageId ');    
    let result = true;
    for(let i of this.items) {
      result = true;
      for(let o of i.options){
        if (!this.isSelected(o.option_id)){
          result = false;
        }
      }
      if(result){
        this.imageId = i.id;
        this.getImage(this.imageId);
      }
    }
    
  }

  isSelected(id){
    let founded = false;;
    for(let c of this.isCombination){
      if(c[1]==id){
        founded = true;
      }
    }
    return founded;
  }

  getImage(id){
    console.log('getImage '+ id);
    for(let item of this.items) {
      if(item.id==id){
        this.image = item.url;
        this.images = [{ id:'0', url:item.url, title:item.title}];
      }
    }
  }

  presupuestoTapped(){
    this.combinationTitle = 'Seleccion: ';
    for(let c of this.Combination) {
      this.combinationTitle = this.combinationTitle + c.title + ': ';
      for(let o of c.options) {
        if(this.Ischecked(c.id,o.id)){
          this.combinationTitle = this.combinationTitle + o.title + '. ';
        }
      }
    }

    this.navCtrl.push(PresupuestoPage,{ subject: 'Solicita Presupuesto: ' + this.item.title, 
    title: 'Solicitar Presupuesto', type: this.combinationTitle});
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
