import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {InAppBrowser} from '@ionic-native/in-app-browser';
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

	public foundRepos;

  	constructor(public navCtrl: NavController, public navParams: NavParams, 
    private servicio: CastilloServiceProvider, private iab: InAppBrowser) {
  		this.title = navParams.get("typeParam");
  	}
	
  	ionViewWillEnter() {
      this.getProyects();
  	  console.log('ionViewDidLoad ProyectsPage');
  	}

	itemTapped(event, item) {
    if(this.title == 'Catalogos'){
        const browser = this.iab.create(item.url, '_system' );
        browser.close();
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
