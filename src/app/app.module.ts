import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { LoginComponent } from './pages/login/login.component';
import { AdministradoresService } from "./services/administradores/administradores.service";
import { HomeComponent } from './pages/home/home.component';
import { AdministradoresComponent } from './pages/administradores/administradores.component';
import { MembresiaComponent } from './pages/membresia/membresia.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdministradoresComponent,
    MembresiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [AdministradoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
