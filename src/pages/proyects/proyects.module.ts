import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProyectsPage } from './proyects';

@NgModule({
  declarations: [
    ProyectsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProyectsPage),
  ],
})
export class ProyectsPageModule {}
