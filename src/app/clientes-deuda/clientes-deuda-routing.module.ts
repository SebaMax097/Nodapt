import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesDeudaPage } from './clientes-deuda.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesDeudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesDeudaPageRoutingModule {}
