import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleRegistrationComponent } from './component/vehicle-registration/vehicle-registration.component';
import { HomeComponent } from './component/home/home.component';
import { ApplicantDataComponent } from './component/applicant-data/applicant-data.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'vehicle/register', component: VehicleRegistrationComponent},
  {path: 'applicant-data', component: ApplicantDataComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
