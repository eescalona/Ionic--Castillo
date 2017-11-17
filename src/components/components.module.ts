import { NgModule } from '@angular/core';
import { MyFooterComponent } from './my-footer/my-footer';
import { MyShareComponent } from './my-share/my-share';
@NgModule({
	declarations: [MyFooterComponent,
    MyShareComponent],
	imports: [],
	exports: [MyFooterComponent,
    MyShareComponent]
})
export class ComponentsModule {}
