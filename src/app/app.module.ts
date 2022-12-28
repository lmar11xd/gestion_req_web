import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequerimientoComponent } from './pages/requerimiento/requerimiento.component';
import { AddEditComponent } from './pages/requerimiento/add-edit/add-edit.component';
import { DeleteComponent } from './pages/requerimiento/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    RequerimientoComponent,
    AddEditComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
