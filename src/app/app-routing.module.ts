import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then( m => m.VentasPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'add-venta',
    loadChildren: () => import('./add-venta/add-venta.module').then( m => m.AddVentaPageModule)
  },
  {
    path: 'add-cliente',
    loadChildren: () => import('./add-cliente/add-cliente.module').then( m => m.AddClientePageModule)
  },
  {
    path: 'details-cliente',
    loadChildren: () => import('./details-cliente/details-cliente.module').then( m => m.DetailsClientePageModule)
  },
  {
    path: 'add-pago',
    loadChildren: () => import('./add-pago/add-pago.module').then( m => m.AddPagoPageModule)
  },
  {
    path: 'add-producto',
    loadChildren: () => import('./add-producto/add-producto.module').then( m => m.AddProductoPageModule)
  },
  {
    path: 'edit-cliente',
    loadChildren: () => import('./edit-cliente/edit-cliente.module').then( m => m.EditClientePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
