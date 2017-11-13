import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/Storage';
import { CastilloServiceProvider } from '../../providers/castillo-service/castillo-service';


@IonicPage()
@Component({
  selector: 'page-presupuesto',
  templateUrl: 'presupuesto.html',
  providers: [CastilloServiceProvider]
})
export class PresupuestoPage {

  public presupuestoForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  subject: AbstractControl;
  body: AbstractControl;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicio: CastilloServiceProvider,
              public _form:FormBuilder, public toast: ToastController, public storage: Storage,) {
    
    this.presupuestoForm = this._form.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      phone:['',[Validators.required,  Validators.pattern('[0-9]*'),
                Validators.minLength(9), Validators.maxLength(9)]],
      subject:['',Validators.required],
      body:['',Validators.required]
    });

    this.name = this.presupuestoForm.controls['name'];
    this.email = this.presupuestoForm.controls['email'];
    this.phone = this.presupuestoForm.controls['phone'];
    this.subject = this.presupuestoForm.controls['subject'];
    this.body = this.presupuestoForm.controls['body'];

    this.subject.setValue(navParams.get("subject"));
    this.title=navParams.get("title");

    this.cargarDatos();
  }

  emailValid(){
    return this.presupuestoForm.valid;
  }

  enviarEmail(){
    			
    let datos = { name: this.name.value, email: this.email.value, phone:this.phone.value};
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

  borrarEmail(){
    this.name.reset();
    this.email.reset();
    this.phone.reset();
    this.body.reset();
    console.log('borrarTapped PresupuestoPage');
  }

  cargarDatos(){
    this.storage.get('myDatos').then(
      (data) => {
        console.log('cargarDatos '+ data);
        if(data != null){
          let datos = JSON.parse(data)
          this.name.setValue(datos.name);
          this.email.setValue(datos.email);
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

}
