import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactlistComponent } from '@components/contactlist/contactlist.component';
import { ContactformComponent } from '@components/contactform/contactform.component';
import { VehiclelistComponent } from '@components/vehiclelist/vehiclelist.component';

const appRoutes: Routes = [
  { path: '',  pathMatch: 'full' , component: ContactlistComponent },
  { path: 'contactform', component: ContactformComponent },
  { path: 'vehiclelist', component: VehiclelistComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

