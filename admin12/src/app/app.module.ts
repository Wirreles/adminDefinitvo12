import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HomePage } from "./component/home/home.page";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";

import { ProductComponent } from './component/product/product.component';
import { ProductsComponent } from './component/products/products.component';
import { NuevosProductsComponent } from "./component/productosNuevos/productosNuevos.component";
import { CategoriasComponent } from "./component/categorias/categorias.component";
import { CategoriaComponent } from "./component/categoria/categoria.component";

import { EventComponent } from "./component/event/event.component";
import { EventsComponent } from "./component/events/events.component";
import { SorteoComponent } from "./component/lotery/lotery.component";
import { SorteosComponent } from "./component/loteryes/loteryes.component";
import { SomoComponent } from "./component/qSomo/quienesSomo.component";
import { SomosComponent } from "./component/qSomos/quienesSomos.component";
import { ProductNuevoComponent } from "./component/productoNuevo/productoNuevo.component";
import { ComentariosComponent } from './component/comentarios/comentarios.component';


@NgModule({
  declarations: [AppComponent,
  HomePage,
  ProductComponent,
  ProductsComponent,
  NuevosProductsComponent,
  ProductNuevoComponent,
  CategoriasComponent,
  CategoriaComponent,
  EventComponent,
  EventsComponent,
  
  
  SorteoComponent,
  SorteosComponent,
  SomoComponent,
  SomosComponent,
  ComentariosComponent
  ],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
    
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
