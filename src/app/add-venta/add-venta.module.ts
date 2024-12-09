import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVentaPageRoutingModule } from './add-venta-routing.module';

import { AddVentaPage } from './add-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVentaPageRoutingModule
  ],
  declarations: [AddVentaPage]
})
export class AddVentaPageModule {}
