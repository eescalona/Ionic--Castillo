import { Component, Input } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'my-share',
  templateUrl: 'my-share.html'
})
export class MyShareComponent {

	@Input() item;
	
	constructor(private sharing:SocialSharing) {
  }

	shareTapped(type){
		if(type=='whatsapp'){
			this.sharing.shareViaWhatsApp(this.item.title,this.item.image_url,null)
			.then(()=>{
				console.log('share whatsapp');		
			}).catch((err) => {
				console.error('share whatsapp error ' + err);						
			});
		}
		if(type=='mail'){
			this.sharing.shareViaEmail(this.item.description,this.item.title,null,null,null,this.item.image_url)
			.then(()=>{
				console.log('share mail');		
			}).catch((err) => {
				console.error('share mail error ' + err);						
			});
		}
		if(type=='facebook'){
			this.sharing.shareViaFacebook(this.item.title,this.item.image_url,null)
			.then(()=>{
				console.log('share facebook');		
			}).catch((err) => {
				console.error('share facebook error ' + err);						
			});
		}
		if(type=='twitter'){
			this.sharing.shareViaTwitter(this.item.title,this.item.image_url,null)
			.then(()=>{
				console.log('share twitter');		
			}).catch((err) => {
				console.error('share twitter error ' + err);						
			});
		}
		if(type=='instagram'){
			this.sharing.shareViaInstagram(this.item.description,this.item.image_url)
			.then(()=>{
				console.log('share instagram');		
			}).catch((err) => {
				console.error('share instagram error ' + err);						
			});
		}
		if(type=='sms'){
			this.sharing.shareViaSMS(this.item.title + '\n'+this.item.description,null)
			.then(()=>{
				console.log('share sms');		
			}).catch((err) => {
				console.error('share sms error ' + err);						
			});
		}
	}
}
