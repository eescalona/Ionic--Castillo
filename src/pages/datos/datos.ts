import { Component } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html',
  providers: [CastilloServiceProvider]
})
export class DatosPage {
  
  public presupuestoForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  subject: string;
  body: string;
  isEnvio: any = false;
  isIOS: any = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private servicio: CastilloServiceProvider, 
              public platform: Platform, public _form:FormBuilder, public toast: ToastController, public storage: Storage) {

    this.presupuestoForm = this._form.group({
    name:['',Validators.required],
    email:['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
    phone:['',[Validators.required,  Validators.pattern('[0-9]*'),
          Validators.minLength(9), Validators.maxLength(9)]]
    });

    this.name = this.presupuestoForm.controls['name'];
    this.email = this.presupuestoForm.controls['email'];
    this.phone = this.presupuestoForm.controls['phone'];

    this.subject=navParams.get("subject");
    this.body=navParams.get("body");

    if (this.platform.is('ios')) {
      this.isIOS = true;
    }
    
    this.cargarDatos();
  }

    cargarDatos(){

      if(this.subject != null){
        this.isEnvio = true;
      }

      this.storage.get('myDatos').then(
        (data) => {
          console.log('cargarDatos '+ data);
          if(data != null){
            let datos = JSON.parse(data)
            this.name.setValue(datos.name);
            this.email.setValue(datos.mail);
            this.phone.setValue(datos.phone);
          }		
        },
        err =>{ 
          this.toast.create({
          message: `cargarDatos error: `+err,
          duration: 3000
          }).present();
        }
      );
    }

    datosValid(){
      return this.presupuestoForm.valid;
    }
    borrarDatos(){
      this.name.reset();
      this.email.reset();
      this.phone.reset();
      this.storage.remove('myDatos');

    }
    guardarDatos(){
      if(this.datosValid()){      
        let datos = { name: this.name.value, mail: this.email.value, phone:this.phone.value, 
                      subject:this.subject, 
                      body:this.body};
        console.log('enviarEmail Datos: ' + JSON.stringify(datos));
    
        //Add datos to bd
        this.storage.get('myDatos').then((data) => {
            if(data != null)
            {
              this.storage.set('myDatos', JSON.stringify(datos));
            }
            else
            {
              this.storage.set('myDatos', JSON.stringify(datos));
            }
        });

        //Volvemos al menu
        this.navCtrl.setRoot(HomePage);
      }
    }

    enviarEmail(){
      if(this.datosValid()){              
        let datos = { name: this.name.value, mail: this.email.value, phone:this.phone.value, 
                      subject:this.subject, 
                      body:this.body};
        console.log('enviarEmail Datos: ' + JSON.stringify(datos));
    
        //Add datos to bd
        this.storage.get('myDatos').then((data) => {
            if(data != null)
            {
              this.storage.set('myDatos', JSON.stringify(datos));
            }
            else
            {
              this.storage.set('myDatos', JSON.stringify(datos));
            }
        });
    
        // Send Mail
        this.servicio.postMail(datos).map(res => res.json()).subscribe(
          data => { // Notification to user
                    this.toast.create({
                      message: `Solicitud realizada.`,
                      duration: 2000
                    }).present();
                    // Volvemos a la pagina anterior.
                    this.navCtrl.pop();
                    this.navCtrl.pop();
            },
          err => {// Notification to user
                  this.toast.create({
                    message: `Error realizando la solicitud.`,
                    duration: 2000
                  }).present();},
          () => { console.log('postMail done') }
        );
      }
    }

}
