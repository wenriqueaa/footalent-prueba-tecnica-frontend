import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { NuevoProductoComponent } from './components/producto/nuevo-producto/nuevo-producto.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path:"nuevoproducto", title:"Nuevo producto", component:NuevoProductoComponent},
  {path:"modificar-producto/:id", title:"Editar producto", component:NuevoProductoComponent}

];

