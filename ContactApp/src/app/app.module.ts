import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppMaterialModule } from './modules/app.material.module';
import { ContactformComponent } from './components/contactform';
import { ContactlistComponent } from './components/contactlist';
import { VehiclelistComponent } from './components/vehiclelist';
import { VehicleformComponent } from './components/vehicleform';
import { CmsComponent } from './components/cms';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { BodystylesComponent } from './components/bodystyles';
import { AlertComponent } from './_components';
import { ContactService, VehicleService, BodystyleService, AuthenticationService, UserService, AlertService } from './_services/';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    ContactformComponent,
    ContactlistComponent,
    VehiclelistComponent,
    VehicleformComponent,
    CmsComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    BodystylesComponent
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
    BodystyleService,
    AuthenticationService,
    UserService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
