import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';

import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { DetailPage } from '../detail/detail';

import {CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';
import { PresupuestoPage } from '../presupuesto/presupuesto';


@IonicPage()
@Component({
  selector: 'page-proyects',
  templateUrl: 'proyects.html',
  providers: [CastilloServiceProvider]
})

export class ProyectsPage {

	public foundRepos;
	public title:string;
	private isProyects: boolean;
	private isCatalogs: boolean;
	private isPromotions: boolean;
	private isFavorites: boolean;
	private isBlogs: boolean;
	private favorites = [];
	private sharing = 0;

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

  	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
				private servicio: CastilloServiceProvider, private iab: InAppBrowser,
				public platform: Platform, public toast: ToastController) {

		this.title = navParams.get("typeParam");
		this.isBlogs = this.title == 'Blog';
		this.isCatalogs = this.title == 'Catalogos';
		this.isPromotions = this.title == 'Promociones';
		this.isFavorites = this.title == 'Mis favoritos';
		this.isProyects = this.title == 'Cocinas' || this.title == 'Armarios';
  	}
	
  	ionViewWillEnter() {
		this.loadFavorites();
		
		if(!this.isFavorites){
    		this.getProyects();
		}
  	}

  	getProyects(){
		console.log('getProyects ');
		this.servicio.getProyects(this.title).map(res => res.json()).subscribe(
			data => {
					if(data.data.length == 0){
						this.foundRepos = null;
					}else{
						this.foundRepos = data.data;
					}
			},
			err => {this.toast.create({
					message: `get Proyects error: `+err,
					duration: 1000
					}).present();	
			},
			() => console.log('get Proyects ')
		);
  	}

	getFavorites(){	
    	this.servicio.getFavorites(this.favorites).map(res => res.json()).subscribe(
    	  data => {
    	    this.foundRepos = data.data;
    	    },
    	    err => this.foundRepos = null,
    	    () => console.log('get Favorites ')
    	);
	}

	loadFavorites(){
		if(this.isProyects || this.isFavorites ){
			this.storage.get('myFavorites').then(
				(data) => {
					console.log('load Favorites '+ data);
					if(data != null){
						this.favorites = data;
					}			
					if(this.isFavorites != null && this.isFavorites)
					{
						this.getFavorites();
					}
				},
				err =>{ 
					this.toast.create({
					message: `load Mis Favoritos error: `+err,
					duration: 3000
					}).present();
				}
			);
		}				
	}

	isItemFavorite(id){

		console.log('isItemFavorite '+ id);
		if(this.favorites == null){
			return false;
		}else{
			if(this.favorites.indexOf(id) == -1){
				return false;
			}else{
				return true;
			}
		}
	}

	setFavorites(item){
		if(this.isItemFavorite(item.id)){
			//Delete item to bd
			console.log('data deleted '+item.id);			
    		this.storage.get('myFavorites').then((data) => {
    	  		if(data != null)
    	  		{
    	    		data.splice(data.indexOf(item.id),1);
					this.storage.set('myFavorites', data);
					this.favorites= data;

					if(this.isFavorites){
						this.getFavorites()
					}

					this.toast.create({
						message: `Eliminado de Mis Favoritos.`,
						duration: 2000
					}).present();

    	  		}
			});
		}else{
			//Add item to bd
			console.log('data added '+item.id);			
    		this.storage.get('myFavorites').then((data) => {
    	  		if(data != null)
    	  		{
					data.push(item.id);
					this.storage.set('myFavorites', data);
					this.favorites= data;
				}
				else
				{
					let array = [];
					array.push(item.id);
					this.storage.set('myFavorites', array);
					this.favorites= array;
				}
			});
			
			this.toast.create({
				message: `Añadida a Mis Favoritos.`,
				duration: 2000
			}).present();
		}
	}

	itemTapped(event, item){
		if(this.isCatalogs || this.isPromotions)
		{
			this.iab.create(item.url, '_system', this.options);
		}
		if(this.isBlogs)
		{
			this.iab.create(item.url, '_self', this.options);
		}   
		if(this.isFavorites){
			this.navCtrl.push(DetailPage,{ item_id: item.id, favorites: this.favorites, isFavorites: this.isFavorites});				
		}
		if(this.isProyects){
			this.navCtrl.push(DetailPage,{ item_id: item.id, favorites: this.favorites, isFavorites: this.isFavorites});
		}
	}

	presupuestoTapped(title){
		if(this.isCatalogs){
			this.navCtrl.push(PresupuestoPage,{ subject: 'Pedido Catálogo: ' + title, title: 'Haznos tu pedido'});
		}else{
			this.navCtrl.push(PresupuestoPage,{ subject: 'Reserva Promoción: ' + title, title: 'Reserva tu promoción'});
		}
	}

	setSharing(id){
		if(this.sharing == id){
			this.sharing = 0;
		}else{
			this.sharing = id;
		}
	}

	isSharing(id){
		return this.sharing == id;
	}
}
