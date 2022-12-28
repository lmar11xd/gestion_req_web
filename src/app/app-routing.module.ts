import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './pages/requerimiento/add-edit/add-edit.component';
import { RequerimientoComponent } from './pages/requerimiento/requerimiento.component';

const routes: Routes = [
  { path: '', redirectTo: 'pages/requerimiento', pathMatch: 'full' },
  { path: 'pages/requerimiento', component: RequerimientoComponent },
  { path: 'pages/add-edit/:id', component: AddEditComponent },
  { path: 'pages/add-edit', component: AddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
