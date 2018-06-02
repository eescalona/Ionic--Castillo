import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/Storage';
import { CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';
import { DatosPage } from '../datos/datos';

@Component({
  selector: 'page-presupuesto',
  templateUrl: 'presupuesto.html',
  providers: [CastilloServiceProvider]
})
export class PresupuestoPage {

  public presupuestoForm: FormGroup;
  subject: string;
  body: AbstractControl;
  title: string;
  name: string;
  email: string;
  phone: string;
  isIOS: any = false;
  design: string;
  designAux: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicio: CastilloServiceProvider,
              public platform: Platform, public _form:FormBuilder, public toast: ToastController, public storage: Storage) {
    
    this.presupuestoForm = this._form.group({
      body:['',Validators.required]
    });

    this.body = this.presupuestoForm.controls['body'];
    this.design =navParams.get("type");
    this.subject=navParams.get("subject");
    this.title=navParams.get("title");

    if (this.platform.is('ios')) {
      this.isIOS = true;
    }

    this.cargarDatos();
  }

  emailValid(){
    return this.presupuestoForm.valid;
  }

  enviarEmail(){
    if(this.emailValid()){ 
      if( this.design != null){
        this.designAux = this.subject
        this.subject = this.subject + this.design;
      }

      if(this.name == null){
        this.navCtrl.push(DatosPage,{ subject: this.subject, body: this.body.value});
      }else{

        let datos = { name: this.name, mail: this.email, phone:this.phone, 
                      subject:this.subject, 
                      body:this.body.value};
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
            },
          err => {// Notification to user
                  this.toast.create({
                    message: `Error realizando la solicitud.`,
                    duration: 2000
                  }).present();},
          () => { console.log('postMail done') }
        );
      }
      if( this.design != null){
        this.subject = this.designAux;
      }
    }
  }

  cargarDatos(){
    this.storage.get('myDatos').then(
      (data) => {
        console.log('cargarDatos '+ data);
        if(data != null){
          let datos = JSON.parse(data)
          this.name = datos.name;
          this.email = datos.mail;
          this.phone = datos.phone;
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

}
