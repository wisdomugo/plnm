import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleRegistrationComponent } from './component/vehicle-registration/vehicle-registration.component';
import { HomeComponent } from './component/home/home.component';
import { ApplicantDataComponent } from './component/applicant-data/applicant-data.component';
import { DriverLicenceComponent } from './component/driver-licence/driver-licence.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'home', component: HomeComponent},
  {path: 'vehicle/register', component: VehicleRegistrationComponent},
  {path: 'applicant-data', component: ApplicantDataComponent},
  {path: 'apply/driver-licence', component: DriverLicenceComponent},

  {path: 'user', loadChildren: './user/user.module#UserModule'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
