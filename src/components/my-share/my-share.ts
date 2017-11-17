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
			this.sharing.shareViaWhatsApp(this.item.title+'\n Descubrelo en: ',this.item.image_url,'http://appcocinascastillo.escalonasoftware.com/')
			.then(()=>{
				console.log('share whatsapp');		
			}).catch((err) => {
				console.error('share whatsapp error ' + err);						
			});
		}
		if(type=='mail'){
			this.sharing.shareViaEmail( this.item.title + '\n Descubrelo en http://appcocinascastillo.escalonasoftware.com/',
										'Cocinas Castillo',null,null,null,this.item.image_url)
			.then(()=>{
				console.log('share mail');		
			}).catch((err) => {
				console.error('share mail error ' + err);						
			});
		}
		if(type=='facebook'){
			this.sharing.shareViaFacebook(this.item.title,this.item.image_url,'http://appcocinascastillo.escalonasoftware.com/')
			.then(()=>{
				console.log('share facebook');		
			}).catch((err) => {
				console.error('share facebook error ' + err);						
			});
		}
		if(type=='twitter'){
			this.sharing.shareViaTwitter(this.item.title,this.item.image_url,'Descubrelo en http://appcocinascastillo.escalonasoftware.com/')
			.then(()=>{
				console.log('share twitter');		
			}).catch((err) => {
				console.error('share twitter error ' + err);						
			});
		}
		if(type=='instagram'){
			this.sharing.shareViaInstagram(this.item.title + '\n Descubrelo en http://appcocinascastillo.escalonasoftware.com/',
											this.item.image_url)
			.then(()=>{
				console.log('share instagram');		
			}).catch((err) => {
				console.error('share instagram error ' + err);						
			});
		}
		if(type=='sms'){
			this.sharing.shareViaSMS(this.item.title + '\n Descubrelo en http://appcocinascastillo.escalonasoftware.com/',null)
			.then(()=>{
				console.log('share sms');		
			}).catch((err) => {
				console.error('share sms error ' + err);						
			});
		}
	}
}
