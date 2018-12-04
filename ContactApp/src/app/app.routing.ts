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
import { BodystylesComponent } from '@components/bodystyles';
import { DeleteconfirmComponent } from '@components/deleteconfirm';
// import { DepreciationchartComponent } from '@components/depreciationchart';

const appRoutes: Routes = [
  { path: '',  pathMatch: 'full' , component: ContactlistComponent },
  { path: 'contactform', component: ContactformComponent },
  { path: 'vehiclelist', component: VehiclelistComponent },
  // { path: 'vehiclelist', component: DepreciationchartComponent },
  { path: 'vehiclelist/:id', component: VehiclelistComponent },
  { path: 'vehicleform', component: VehicleformComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cms', component: CmsComponent, canActivate: [AuthGuard] },
  { path: 'bodystyle', component: BodystylesComponent, canActivate: [AuthGuard] },
  { path: 'bodystyle', component: DeleteconfirmComponent, canActivate: [AuthGuard] }
];

// export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

