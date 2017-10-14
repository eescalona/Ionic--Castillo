import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

import {CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers: [CastilloServiceProvider]
})
export class DetailPage {
	public item;
	public itemId;
	public grid: any[][];
//  public grid1: any[][];
	public items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private servicio: CastilloServiceProvider) {
  	this.item = navParams.get("item");
  	this.itemId = navParams.get("item_id");
    
  }

  ionViewWillEnter() {
  	console.log('ionViewWillEnter DetailPage');
    if(this.itemId != null){
      this.getItem();
      console.log('constructor DetailPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    if(this.itemId == null){
      this.getGallery();
    }
  }

  getItem(){
      console.log('getItem');
    	this.servicio.getItem(this.itemId).map(res => res.json()).subscribe(
      		data => {
        		this.item = data.data;
        		},
        	err => console.log('getItem error'),
        	() => this.getGallery()
    	);
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
      
  	this.grid = Array(Math.ceil((this.items.length-1)/2));

  	let rowNum = 0; //counter to iterate over the rows in the grid

	 for (let i = 1; i < this.items.length; i+=2) { //iterate images

      this.grid[rowNum] = Array(2); //declare two elements per row													
      if (this.items[i]) { //check file URI exists
			  this.grid[rowNum][0] = this.items[i]; //insert image
        this.grid[rowNum][0].id = i;
      }													
       if (i+1 < this.items.length && this.items[i+1]) { //repeat for the second image
			  this.grid[rowNum][1] = this.items[i+1];
         this.grid[rowNum][1].id = i+1;
       }else{
         this.grid[rowNum][1] = { url: '', }; //insert url 
       }
       rowNum++; //go on to the next row
	  }

		  console.log('getGrid');

    //  this.grid1 = Array(2);

    //  let rowNum1 = 0; //counter to iterate over the rows in the grid

    //    this.grid1[0] = Array(Math.ceil((this.items.length-1)/2)); //declare two elements per row 
    //    this.grid1[1] = Array(Math.ceil((this.items.length-1)/2)); //declare two elements per row 
    //  for (let i = 1; i < this.items.length; i+=2) { //iterate images
                         
    //    if (this.items[i]) { //check file URI exists
    //      this.grid1[0][rowNum1] = this.items[i]; //insert image
    //      this.grid1[0][rowNum1].id = i;
    //    }                         
    //    if (i+1 < this.items.length && this.items[i+1]) { //repeat for the second image
    //      this.grid1[1][rowNum1] = this.items[i+1];
    //      this.grid1[1][rowNum1].id = i+1;
    //    }else{
    //      this.grid1[1][rowNum1] = { url: '', }; //insert url 
    //    }
    //    rowNum1++; //go on to the next row
    //  }
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
    this.navCtrl.push(DetailPage,{ item_id: newid, item: {image_url: ''} });
	} 

}
