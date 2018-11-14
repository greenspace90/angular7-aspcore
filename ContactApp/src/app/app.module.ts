import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppMaterialModule } from './modules/app.material.module';
import { ContactformComponent } from './components/contactform/contactform.component';
import { ContactlistComponent } from './components/contactlist/contactlist.component';
import { VehiclelistComponent } from './components/vehiclelist/vehiclelist.component';
import { VehicleformComponent } from './components/vehicleform/vehicleform.component';
import { ContactService, VehicleService, BodystyleService } from './_services/';
import { CmsComponent } from './components/cms/cms.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactformComponent,
    ContactlistComponent,
    VehiclelistComponent,
    VehicleformComponent,
    CmsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    Routing
  ],
  providers: [
    ContactService,
    VehicleService,
    BodystyleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
