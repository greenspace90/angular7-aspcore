import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactlistComponent } from '@components/contactlist/contactlist.component';
import { ContactformComponent } from '@components/contactform/contactform.component';
import { VehiclelistComponent } from '@components/vehiclelist/vehiclelist.component';
import { VehicleformComponent } from '@components/vehicleform/vehicleform.component';

const appRoutes: Routes = [
  { path: '',  pathMatch: 'full' , component: ContactlistComponent },
  { path: 'contactform', component: ContactformComponent },
  { path: 'vehiclelist', component: VehiclelistComponent },
  { path: 'vehiclelist/:id', component: VehiclelistComponent },
  { path: 'vehicleform', component: VehicleformComponent }
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

