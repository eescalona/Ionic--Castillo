import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http'

/**
 * Generated class for the HtmlPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-html',
  templateUrl: 'html.html',
})
export class HtmlPage {

	public title:string;
	public url:any;

  	constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  		this.title = navParams.get("typeParam");  
  	}

  	ionViewDidLoad() {
  		if(this.title == 'Blog'){
	  		this.http.get('http://castillococinas.es/blog/').subscribe(data => {
        		this.url= data;
    		});
    		console.log(this.url);
  		}else{
  			if(this.title == 'Servicios'){
				this.http.get('http://castillococinas.es/producto-y-servicios/').subscribe(data => {
        			this.url= data;
    			});
  			}
  		}

    	console.log('ionViewDidLoad HtmlPage');
  	}

}
