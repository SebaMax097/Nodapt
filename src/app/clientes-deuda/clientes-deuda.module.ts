import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesDeudaPageRoutingModule } from './clientes-deuda-routing.module';

import { ClientesDeudaPage } from './clientes-deuda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesDeudaPageRoutingModule
  ],
  declarations: [ClientesDeudaPage]
})
export class ClientesDeudaPageModule {}
