import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppMaterialModule } from './modules/app.material.module';
import {MatTableModule} from '@angular/material/table';
// import { MatColorPickerModule } from 'mat-color-picker/index';
// import { MccColorPickerModule } from 'material-community-components';
import { ContactformComponent } from './components/contactform';
import { ContactlistComponent } from './components/contactlist';
import { VehiclelistComponent } from './components/vehiclelist';
import { VehicleformComponent } from './components/vehicleform';
import { CmsComponent } from './components/cms';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register';
import { BodystylesComponent } from './components/bodystyles';
import { DeleteconfirmComponent } from './components/deleteconfirm';
import { DepreciationchartComponent } from './components/depreciationchart';
import { SettingsComponent } from './components/settings';
import { AlertComponent } from './_components';
import { ContactService, VehicleService, BodystyleService, AuthenticationService, UserService, AlertService, SettingsService } from './_services/';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { MatDatepickerModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatDialogModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
import { ColorPickerModule } from 'ngx-color-picker';
import { ImageuploaderComponent } from './components/imageuploader';
import { FileValidator, FileValueAccessor } from '@app/shared';

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
    BodystylesComponent,
    DeleteconfirmComponent,
    DepreciationchartComponent,
    SettingsComponent,
    ImageuploaderComponent,
    FileValidator,
    FileValueAccessor
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule, // provides moment date adapter
    MatMomentDateModule,
    MatDialogModule,
    MatTableModule,
    ColorPickerModule,
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
    SettingsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DepreciationchartComponent
  ],
})
export class AppModule { }
