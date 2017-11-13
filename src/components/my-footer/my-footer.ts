import { Component } from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'my-footer',
  templateUrl: 'my-footer.html'
})
export class MyFooterComponent {

  constructor(private iab: InAppBrowser, private callNumber: CallNumber) {
    console.log('Hello MyFooterComponent Component');
  }

  navigateFooter(typeParam:string) {
    
        if(typeParam == 'call'){
    
          this.callNumber.callNumber("34952360495", true)
              .then(() => console.log('callNumber.isAvailable'))
              .catch((error) => {console.log('callNumber.isAvailable error'), console.error(error)});
    
            ;
        }
        if(typeParam == 'mail'){
          const browser = this.iab.create(`mailto:mueblescastillo@hotmail.es?Subject=Cocinas Castillo App`, '_system');
              browser.close();
        }
        if(typeParam == 'facebook'){
          const browser = this.iab.create("https://www.facebook.com/cocinasyarmarioscastillo", '_system' );
              browser.close();
        }
        if(typeParam == 'twitter'){
          const browser = this.iab.create("https://twitter.com/CocinasCastillo", '_system' );
              browser.close();
        }
        if(typeParam == 'youtube'){
          const browser = this.iab.create("https://www.youtube.com/channel/UCpk-yArbevL6B5EBxk7xYyw?guided_help_flow=3", '_system' );
              browser.close();
        }
        if(typeParam == 'chrome'){
          const browser = this.iab.create("http://castillococinas.es/", '_system' );
              browser.close();
        }
        if(typeParam == 'map'){
          const browser = this.iab.create("https://www.google.es/maps/place/COCINAS+CASTILLO/@36.7097173,-4.4850416,17z/data=!3m1!4b1!4m5!3m4!1s0xd72f0b261d84181:0x64e3b9b726fe05b1!8m2!3d36.7097173!4d-4.4828529", '_system' );
              browser.close();
        }
      }
}
