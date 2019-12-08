import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { VehicleRegistrationComponent } from './component/vehicle-registration/vehicle-registration.component';
import { ApplicantDataComponent } from './component/applicant-data/applicant-data.component';
import { DriverLicenceComponent } from './component/driver-licence/driver-licence.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VehicleRegistrationComponent,
    FileSelectDirective,
    ApplicantDataComponent,
    DriverLicenceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
