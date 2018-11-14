import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmsComponent } from '@components/cms';
import { LoginComponent } from '@components/login';
import { RegisterComponent } from '@components/register';
import { AuthGuard } from './_guards';

import { AppComponent } from './app.component';
import { ContactlistComponent } from '@components/contactlist';
import { ContactformComponent } from '@components/contactform';
import { VehiclelistComponent } from '@components/vehiclelist';
import { VehicleformComponent } from '@components/vehicleform';

const appRoutes: Routes = [
  { path: '',  pathMatch: 'full' , component: ContactlistComponent },
  { path: 'contactform', component: ContactformComponent },
  { path: 'vehiclelist', component: VehiclelistComponent },
  { path: 'vehiclelist/:id', component: VehiclelistComponent },
  { path: 'vehicleform', component: VehicleformComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cms', component: CmsComponent, canActivate: [AuthGuard] },

];

// https://stackoverflow.com/questions/46771315/angular-cannot-get
// const appRoutes: Routes = [
// { path: '', component: ContactlistComponent, children: [ 
// { path: '', redirectTo: 'contact', pathMatch: 'full' },   
// { path: 'contactform', component: ContactformComponent },
// { path: 'vehiclelist', component: VehiclelistComponent },
// { path: 'vehicleform', component: VehicleformComponent }]}];

// export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

